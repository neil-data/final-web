from datetime import datetime

from rest_framework.views import APIView

from apps.common.audit import audit_event
from apps.common.auth import require_auth, require_roles
from apps.common.pagination import paginate_list
from apps.common.responses import fail, ok
from apps.common.validation import normalize_email, validate_iar_email
from repositories.memory_store.store import store


class QueryListCreateView(APIView):
    @require_auth
    def get(self, request):
        session = request.session_user
        data = store.queries
        if session["role"] == "student":
            data = [q for q in data if q["email"].lower() == session["email"].lower()]
        email = request.query_params.get("email")
        if email:
            data = [q for q in data if q["email"].lower() == email.lower()]
        return ok(paginate_list(request, data))

    @require_auth
    def post(self, request):
        name = (request.data.get("name") or "").strip()
        email = normalize_email(request.data.get("email") or request.session_user.get("email") or "")
        subject = (request.data.get("subject") or "").strip()
        message = (request.data.get("message") or "").strip()
        if not name or not email or not subject or not message:
            return fail("All fields are required")
        invalid_email_response = validate_iar_email(email)
        if invalid_email_response:
            return invalid_email_response
        item = {
            "id": store.next_id("q"),
            "name": name,
            "email": email,
            "subject": subject,
            "message": message,
            "submittedAt": datetime.utcnow().isoformat() + "Z",
            "repliedAt": None,
            "adminReply": None,
            "repliedBy": None,
            "status": "open",
        }
        store.queries.insert(0, item)
        store.touch()
        audit_event("queries.create", request.session_user.get("email", "unknown"), item["id"], {"subject": subject})
        return ok(item, "Query submitted", 201)


class QueryReplyView(APIView):
    @require_auth
    @require_roles("leader", "tech", "marketing", "documentation", "operations", "outreach")
    def patch(self, request, query_id: str):
        query = next((q for q in store.queries if q["id"] == query_id), None)
        if not query:
            return fail("Query not found", code=404)
        reply = (request.data.get("reply") or "").strip()
        if not reply:
            return fail("Reply cannot be empty")
        query["adminReply"] = reply
        query["repliedBy"] = request.session_user.get("email")
        query["repliedAt"] = datetime.utcnow().isoformat() + "Z"
        query["status"] = "replied"
        store.touch()
        audit_event("queries.reply", request.session_user.get("email", "unknown"), query_id)
        return ok(query, "Reply sent")
