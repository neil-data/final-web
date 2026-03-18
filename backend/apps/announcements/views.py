from rest_framework.views import APIView

from apps.common.audit import audit_event
from apps.common.auth import require_auth, require_roles
from apps.common.pagination import paginate_list
from apps.common.responses import fail, ok
from repositories.memory_store.store import store


class AnnouncementListCreateView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        return ok(paginate_list(request, store.announcements))

    @require_auth
    @require_roles("leader", "tech", "marketing", "documentation", "outreach")
    def post(self, request):
        item = {
            "id": store.next_id("a"),
            "title": request.data.get("title") or "",
            "content": request.data.get("content") or "",
            "type": request.data.get("type") or "general",
            "author": request.session_user.get("email"),
            "createdAt": request.data.get("createdAt") or "",
            "pinned": bool(request.data.get("pinned")),
        }
        store.announcements.insert(0, item)
        store.touch()
        audit_event("announcements.create", request.session_user.get("email", "unknown"), item["id"], {"type": item.get("type")})
        return ok(item, "Announcement created", 201)


class AnnouncementView(APIView):
    @require_auth
    @require_roles("leader", "tech", "marketing", "documentation", "outreach")
    def patch(self, request, announcement_id: str):
        item = next((a for a in store.announcements if a["id"] == announcement_id), None)
        if not item:
            return fail("Announcement not found", code=404)
        for key in ["title", "content", "type", "pinned"]:
            if key in request.data:
                item[key] = request.data.get(key)
        store.touch()
        audit_event("announcements.update", request.session_user.get("email", "unknown"), announcement_id)
        return ok(item, "Announcement updated")

    @require_auth
    @require_roles("leader", "tech", "marketing", "documentation", "outreach")
    def delete(self, request, announcement_id: str):
        before = len(store.announcements)
        store.announcements = [a for a in store.announcements if a["id"] != announcement_id]
        if len(store.announcements) == before:
            return fail("Announcement not found", code=404)
        store.touch()
        audit_event("announcements.delete", request.session_user.get("email", "unknown"), announcement_id)
        return ok(message="Announcement deleted")
