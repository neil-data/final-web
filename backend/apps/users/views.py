from rest_framework.views import APIView

from apps.common.audit import audit_event
from apps.common.auth import require_auth, require_roles
from apps.common.pagination import paginate_list
from apps.common.responses import fail, ok
from apps.common.validation import normalize_email, parse_int, validate_iar_email
from repositories.memory_store.store import store


def _find_user(user_id: str):
    return next((u for u in store.users if u["id"] == user_id), None)


class UserListView(APIView):
    @require_auth
    def get(self, request):
        return ok(paginate_list(request, store.users))

    @require_auth
    @require_roles("leader", "tech", "operations")
    def post(self, request):
        email = normalize_email(request.data.get("email") or "")
        invalid_email_response = validate_iar_email(email)
        if invalid_email_response:
            return invalid_email_response
        if any(u["email"].lower() == email for u in store.users):
            return fail("User already exists")
        user = {
            "id": store.next_id("u"),
            "name": request.data.get("name") or email.split("@")[0],
            "email": email,
            "role": "student",
            "points": parse_int(request.data.get("points"), 0, 0),
            "banned": False,
            "iarNo": request.data.get("iarNo") or "",
            "department": request.data.get("department") or "",
            "year": request.data.get("year") or "",
            "phone": request.data.get("phone") or "",
            "bio": request.data.get("bio") or "",
            "github": request.data.get("github") or "",
            "linkedin": request.data.get("linkedin") or "",
            "createdAt": "",
        }
        store.users.insert(0, user)
        store.touch()
        audit_event("users.create", request.session_user.get("email", "unknown"), user["id"], {"email": email})
        return ok(user, "User created", 201)


class UserDetailView(APIView):
    @require_auth
    def get(self, request, user_id: str):
        user = _find_user(user_id)
        if not user:
            return fail("User not found", code=404)
        return ok(user)

    @require_auth
    def patch(self, request, user_id: str):
        user = _find_user(user_id)
        if not user:
            return fail("User not found", code=404)
        session = request.session_user
        if session["role"] == "student" and session["userId"] != user_id:
            return fail("Forbidden", code=403)

        editable = ["name", "iarNo", "department", "year", "phone", "bio", "github", "linkedin"]
        for key in editable:
            if key in request.data:
                user[key] = request.data.get(key) or ""
        store.touch()
        audit_event("users.update", session.get("email", "unknown"), user_id, {"fields": [k for k in editable if k in request.data]})
        return ok(user, "User updated")

    @require_auth
    @require_roles("leader", "tech", "operations")
    def delete(self, request, user_id: str):
        before = len(store.users)
        store.users = [u for u in store.users if u["id"] != user_id]
        store.registrations = [r for r in store.registrations if r["userId"] != user_id]
        if len(store.users) == before:
            return fail("User not found", code=404)
        store.touch()
        audit_event("users.delete", request.session_user.get("email", "unknown"), user_id)
        return ok(message="User removed")


class UserPointsView(APIView):
    @require_auth
    @require_roles("leader", "tech", "operations")
    def patch(self, request, user_id: str):
        user = _find_user(user_id)
        if not user:
            return fail("User not found", code=404)
        delta = parse_int(request.data.get("delta"), 0)
        user["points"] = max(0, int(user["points"]) + delta)
        store.touch()
        audit_event("users.points", request.session_user.get("email", "unknown"), user_id, {"delta": delta, "newPoints": user["points"]})
        return ok(user, "Points updated")


class UserStatusView(APIView):
    @require_auth
    @require_roles("leader", "tech", "operations")
    def patch(self, request, user_id: str):
        user = _find_user(user_id)
        if not user:
            return fail("User not found", code=404)
        banned = bool(request.data.get("banned"))
        user["banned"] = banned
        if banned:
            store.registrations = [r for r in store.registrations if r["userId"] != user_id]
        store.touch()
        audit_event("users.status", request.session_user.get("email", "unknown"), user_id, {"banned": banned})
        return ok(user, "User status updated")
