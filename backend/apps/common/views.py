from rest_framework.views import APIView

from apps.common.responses import ok


class RootView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        return ok(
            {
                "service": "GDGOC Backend",
                "status": "running",
                "entrypoints": {
                    "api": "/api/v1/",
                    "health": "/api/v1/health/",
                },
            },
            "Backend root",
        )


class HealthView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        return ok({"service": "gdgoc-backend", "status": "healthy"}, "Health check OK")


class ApiIndexView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        return ok(
            {
                "version": "v1",
                "health": "/api/v1/health/",
                "modules": [
                    "auth",
                    "users",
                    "events",
                    "registrations",
                    "queries",
                    "media",
                    "announcements",
                    "leaderboard",
                    "analytics",
                    "settings",
                ],
            },
            "API index",
        )
