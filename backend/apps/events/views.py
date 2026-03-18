from rest_framework.views import APIView

from apps.common.audit import audit_event
from apps.common.auth import require_auth, require_roles
from apps.common.pagination import paginate_list
from apps.common.responses import fail, ok
from apps.common.validation import parse_int
from repositories.memory_store.store import store


def _with_counts(event: dict) -> dict:
    count = len([r for r in store.registrations if r["eventId"] == event["id"]])
    return {**event, "registered": count}


class EventListView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        data = [_with_counts(e) for e in store.events]
        return ok(paginate_list(request, data))

    @require_auth
    @require_roles("leader", "tech", "operations", "marketing")
    def post(self, request):
        event = {
            "id": store.next_id("e"),
            "title": request.data.get("title") or "New Event",
            "date": request.data.get("date") or "",
            "endDate": request.data.get("endDate"),
            "time": request.data.get("time") or "",
            "location": request.data.get("location") or "",
            "category": request.data.get("category") or "community",
            "status": request.data.get("status") or "upcoming",
            "shortDesc": request.data.get("shortDesc") or "",
            "description": request.data.get("description") or "",
            "banner": request.data.get("banner") or "",
            "capacity": parse_int(request.data.get("capacity"), 100, 1),
            "registered": 0,
            "teamRegistration": bool(request.data.get("teamRegistration")),
            "teamMinSize": parse_int(request.data.get("teamMinSize"), 2, 1),
            "teamMaxSize": parse_int(request.data.get("teamMaxSize"), 4, 1),
            "registrationFields": request.data.get("registrationFields") or [],
            "tags": request.data.get("tags") or [],
            "speakers": request.data.get("speakers") or [],
            "schedule": request.data.get("schedule") or [],
            "faq": request.data.get("faq") or [],
        }
        if event["teamMaxSize"] < event["teamMinSize"]:
            return fail("teamMaxSize must be greater than or equal to teamMinSize")
        store.events.insert(0, event)
        store.touch()
        audit_event("events.create", request.session_user.get("email", "unknown"), event["id"], {"title": event["title"]})
        return ok(event, "Event created", 201)


class EventDetailView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, event_id: str):
        event = next((e for e in store.events if e["id"] == event_id), None)
        if not event:
            return fail("Event not found", code=404)
        return ok(_with_counts(event))

    @require_auth
    @require_roles("leader", "tech", "operations", "marketing")
    def patch(self, request, event_id: str):
        event = next((e for e in store.events if e["id"] == event_id), None)
        if not event:
            return fail("Event not found", code=404)
        for key in [
            "title",
            "date",
            "endDate",
            "time",
            "location",
            "category",
            "status",
            "shortDesc",
            "description",
            "banner",
            "teamRegistration",
            "registrationFields",
            "tags",
            "speakers",
            "schedule",
            "faq",
        ]:
            if key in request.data:
                event[key] = request.data.get(key)
        if "capacity" in request.data:
            event["capacity"] = parse_int(request.data.get("capacity"), event.get("capacity", 100), 1)
        store.touch()
        audit_event("events.update", request.session_user.get("email", "unknown"), event_id)
        return ok(_with_counts(event), "Event updated")

    @require_auth
    @require_roles("leader", "tech", "operations")
    def delete(self, request, event_id: str):
        before = len(store.events)
        store.events = [e for e in store.events if e["id"] != event_id]
        store.registrations = [r for r in store.registrations if r["eventId"] != event_id]
        if len(store.events) == before:
            return fail("Event not found", code=404)
        store.touch()
        audit_event("events.delete", request.session_user.get("email", "unknown"), event_id)
        return ok(message="Event deleted")
