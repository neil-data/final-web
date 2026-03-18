from rest_framework.views import APIView

from apps.common.audit import audit_event
from apps.common.auth import require_auth, require_roles
from apps.common.pagination import paginate_list
from apps.common.responses import fail, ok
from apps.common.validation import normalize_email, parse_int, validate_iar_email
from repositories.memory_store.store import store


def _event(event_id: str):
    return next((e for e in store.events if e["id"] == event_id), None)


class RegistrationListCreateView(APIView):
    @require_auth
    def get(self, request):
        event_id = request.query_params.get("eventId")
        email = request.query_params.get("email")
        data = store.registrations
        if event_id:
            data = [r for r in data if r["eventId"] == event_id]
        if email:
            data = [r for r in data if r["email"].lower() == email.lower()]
        return ok(paginate_list(request, data))

    @require_auth
    def post(self, request):
        event_id = request.data.get("eventId")
        event = _event(event_id)
        if not event:
            return fail("Event not found", code=404)

        email = normalize_email(request.data.get("email") or "")
        invalid_email_response = validate_iar_email(email)
        if invalid_email_response:
            return invalid_email_response
        if any(r["eventId"] == event_id and r["email"].lower() == email for r in store.registrations):
            return fail("Already registered for this event")

        if len([r for r in store.registrations if r["eventId"] == event_id]) >= parse_int(event.get("capacity"), 100, 1):
            return fail("Event is full")

        registration = {
            "id": store.next_id("reg"),
            "eventId": event_id,
            "userId": request.data.get("userId") or request.session_user.get("userId"),
            "name": request.data.get("name") or "",
            "email": email,
            "iarNo": request.data.get("iarNo") or "",
            "department": request.data.get("department") or "",
            "year": request.data.get("year") or "",
            "teamId": request.data.get("teamId"),
            "teamName": request.data.get("teamName"),
            "isLeader": bool(request.data.get("isLeader")),
            "customFieldValues": request.data.get("customFieldValues") or {},
            "registeredAt": "",
        }
        store.registrations.insert(0, registration)
        store.touch()
        audit_event("registrations.create", request.session_user.get("email", "unknown"), registration["id"], {"eventId": event_id})
        return ok(registration, "Registered successfully", 201)


class RegistrationView(APIView):
    @require_auth
    def patch(self, request, registration_id: str):
        reg = next((r for r in store.registrations if r["id"] == registration_id), None)
        if not reg:
            return fail("Registration not found", code=404)
        session = request.session_user
        if session["role"] == "student" and reg["userId"] != session["userId"]:
            return fail("Forbidden", code=403)
        for key in ["name", "email", "iarNo", "department", "year", "teamName", "customFieldValues"]:
            if key in request.data:
                reg[key] = request.data.get(key)
        store.touch()
        audit_event("registrations.update", session.get("email", "unknown"), registration_id)
        return ok(reg, "Registration updated")

    @require_auth
    def delete(self, request, registration_id: str):
        reg = next((r for r in store.registrations if r["id"] == registration_id), None)
        if not reg:
            return fail("Registration not found", code=404)
        session = request.session_user
        if session["role"] == "student" and reg["userId"] != session["userId"]:
            return fail("Forbidden", code=403)
        store.registrations = [r for r in store.registrations if r["id"] != registration_id]
        store.touch()
        audit_event("registrations.delete", session.get("email", "unknown"), registration_id)
        return ok(message="Registration removed")
