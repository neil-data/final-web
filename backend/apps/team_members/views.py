from rest_framework.views import APIView

from apps.common.audit import audit_event
from apps.common.auth import require_auth, require_roles
from apps.common.pagination import paginate_list
from apps.common.responses import fail, ok
from repositories.memory_store.store import store


class TeamMemberListCreateView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        team = request.query_params.get("team")
        data = store.team_members
        if team and team != "all":
            data = [member for member in data if member.get("team") == team]
        return ok(paginate_list(request, data))

    @require_auth
    @require_roles("leader", "tech", "operations")
    def post(self, request):
        member = {
            "id": store.next_id("t"),
            "name": request.data.get("name") or "",
            "role": request.data.get("role") or "",
            "team": request.data.get("team") or "tech",
            "avatar": request.data.get("avatar") or "",
            "bio": request.data.get("bio") or "",
            "socials": request.data.get("socials") or {},
        }
        if not member["name"] or not member["role"] or not member["bio"]:
            return fail("name, role, and bio are required")
        store.team_members.insert(0, member)
        store.touch()
        audit_event("team.create", request.session_user.get("email", "unknown"), member["id"], {"name": member["name"]})
        return ok(member, "Team member created", 201)


class TeamMemberView(APIView):
    @require_auth
    @require_roles("leader", "tech", "operations")
    def patch(self, request, member_id: str):
        member = next((item for item in store.team_members if item["id"] == member_id), None)
        if not member:
            return fail("Team member not found", code=404)

        for field in ["name", "role", "team", "avatar", "bio", "socials"]:
            if field in request.data:
                member[field] = request.data.get(field)

        if not member.get("name") or not member.get("role") or not member.get("bio"):
            return fail("name, role, and bio are required")

        store.touch()
        audit_event("team.update", request.session_user.get("email", "unknown"), member_id)
        return ok(member, "Team member updated")

    @require_auth
    @require_roles("leader", "tech", "operations")
    def delete(self, request, member_id: str):
        before = len(store.team_members)
        store.team_members = [item for item in store.team_members if item["id"] != member_id]
        if len(store.team_members) == before:
            return fail("Team member not found", code=404)
        store.touch()
        audit_event("team.delete", request.session_user.get("email", "unknown"), member_id)
        return ok(message="Team member removed")
