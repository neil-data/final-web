from rest_framework.views import APIView

from apps.common.audit import audit_event
from apps.common.auth import require_auth
from apps.common.responses import fail, ok
from apps.common.validation import normalize_email, validate_iar_email
from repositories.memory_store.store import store

ADMIN_ROLES = {"leader", "tech", "marketing", "documentation", "operations", "outreach"}
ROOT_ADMIN_EMAIL = "gdgociar26@gmail.com"
ROOT_ADMIN_PASSWORD = "gdgoc@26iqr"


def _find_or_create_student(name: str, email: str):
    existing = next((u for u in store.users if u["email"].lower() == email.lower()), None)
    if existing:
        return existing
    user = {
        "id": store.next_id("u"),
        "name": name or email.split("@")[0],
        "email": email,
        "role": "student",
        "points": 0,
        "banned": False,
        "iarNo": "",
        "department": "",
        "year": "",
        "phone": "",
        "bio": "",
        "github": "",
        "linkedin": "",
        "createdAt": "",
    }
    store.users.insert(0, user)
    return user


class StudentLoginView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_scope = "auth"

    def post(self, request):
        email = normalize_email(request.data.get("email") or "")
        name = (request.data.get("name") or "").strip()
        invalid_email_response = validate_iar_email(email)
        if invalid_email_response:
            return invalid_email_response
        user = _find_or_create_student(name, email)
        if user.get("banned"):
            return fail("This account has been banned")
        token = store.issue_token(user["id"], email, "student")
        audit_event("auth.student_login", email, user["id"], {"role": "student"})
        return ok({"token": token, "user": user}, "Student login successful")


class AdminLoginView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_scope = "auth"

    def post(self, request):
        email = normalize_email(request.data.get("email") or "")
        password = (request.data.get("password") or "")
        role = (request.data.get("role") or "").strip().lower()
        if email != ROOT_ADMIN_EMAIL:
            invalid_email_response = validate_iar_email(email)
            if invalid_email_response:
                return invalid_email_response
        if not password:
            return fail("Password is required")
        if role not in ADMIN_ROLES:
            return fail("Invalid admin role")
        if email != ROOT_ADMIN_EMAIL or password != ROOT_ADMIN_PASSWORD:
            return fail("Invalid admin credentials")
        token = store.issue_token("admin", email, role)
        audit_event("auth.admin_login", email, "admin", {"role": role})
        return ok({"token": token, "user": {"email": email, "role": role}}, "Admin login successful")


class MeView(APIView):
    @require_auth
    def get(self, request):
        session = request.session_user
        if session["role"] == "student":
            user = next((u for u in store.users if u["id"] == session["userId"]), None)
            return ok({"session": session, "user": user})
        return ok({"session": session, "user": {"email": session["email"], "role": session["role"]}})


class LogoutView(APIView):
    @require_auth
    def post(self, request):
        auth_header = request.headers.get("Authorization", "")
        token = auth_header.replace("Bearer ", "", 1).strip()
        session = request.session_user
        store.revoke_token(token)
        audit_event("auth.logout", session.get("email", "unknown"), session.get("userId", "unknown"), {"role": session.get("role")})
        return ok(message="Logged out")
