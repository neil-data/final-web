from rest_framework.views import APIView

from apps.common.audit import audit_event
from apps.common.auth import require_auth, require_roles
from apps.common.pagination import paginate_list
from apps.common.responses import fail, ok
from repositories.memory_store.store import store


class MediaListCreateView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        category = request.query_params.get("category")
        data = store.media_items
        if category and category != "all":
            data = [m for m in data if m["category"] == category]
        return ok(paginate_list(request, data))

    @require_auth
    @require_roles("leader", "tech", "marketing", "documentation")
    def post(self, request):
        item = {
            "id": store.next_id("m"),
            "type": request.data.get("type") or "photo",
            "category": request.data.get("category") or "community",
            "title": request.data.get("title") or "",
            "src": request.data.get("src") or "",
            "thumbnail": request.data.get("thumbnail") or request.data.get("src") or "",
            "link": request.data.get("link"),
            "event": request.data.get("event"),
            "date": request.data.get("date") or "",
        }
        store.media_items.insert(0, item)
        store.touch()
        audit_event("media.create", request.session_user.get("email", "unknown"), item["id"], {"title": item.get("title")})
        return ok(item, "Media created", 201)


class MediaView(APIView):
    @require_auth
    @require_roles("leader", "tech", "marketing", "documentation")
    def delete(self, request, media_id: str):
        before = len(store.media_items)
        store.media_items = [m for m in store.media_items if m["id"] != media_id]
        if len(store.media_items) == before:
            return fail("Media not found", code=404)
        store.touch()
        audit_event("media.delete", request.session_user.get("email", "unknown"), media_id)
        return ok(message="Media deleted")
