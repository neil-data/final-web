from rest_framework.views import APIView

from apps.common.audit import audit_event
from apps.common.auth import require_auth, require_roles
from apps.common.responses import ok
from apps.common.validation import parse_int
from repositories.memory_store.store import store


class PlatformSettingsView(APIView):
    @require_auth
    def get(self, request):
        return ok(store.settings)

    @require_auth
    @require_roles("leader", "tech")
    def patch(self, request):
        if "maintenanceMode" in request.data:
            store.settings["maintenanceMode"] = bool(request.data.get("maintenanceMode"))
        if "pointsPerEvent" in request.data:
            store.settings["pointsPerEvent"] = parse_int(request.data.get("pointsPerEvent"), store.settings.get("pointsPerEvent", 50), 0)
        if "pointsForSpeaking" in request.data:
            store.settings["pointsForSpeaking"] = parse_int(request.data.get("pointsForSpeaking"), store.settings.get("pointsForSpeaking", 200), 0)
        if "pointsForOrganizing" in request.data:
            store.settings["pointsForOrganizing"] = parse_int(request.data.get("pointsForOrganizing"), store.settings.get("pointsForOrganizing", 150), 0)
        if "pointsForHackathonWin" in request.data:
            store.settings["pointsForHackathonWin"] = parse_int(request.data.get("pointsForHackathonWin"), store.settings.get("pointsForHackathonWin", 500), 0)

        store.touch()
        audit_event("settings.update", request.session_user.get("email", "unknown"), "platform_settings")
        return ok(store.settings, "Settings updated")
