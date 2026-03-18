from collections import Counter

from django.core.cache import cache
from rest_framework.views import APIView

from apps.common.auth import require_auth, require_roles
from apps.common.responses import ok
from repositories.memory_store.store import store


class AnalyticsSummaryView(APIView):
    @require_auth
    @require_roles("leader", "tech", "marketing", "operations", "outreach", "documentation")
    def get(self, request):
        cache_key = f"analytics:summary:v{store.version}"
        cached = cache.get(cache_key)
        if cached is not None:
            return ok(cached)

        category_counts = Counter(event.get("category", "unknown") for event in store.events)
        payload = {
            "totalUsers": len(store.users),
            "totalEvents": len(store.events),
            "totalRegistrations": len(store.registrations),
            "openQueries": len([q for q in store.queries if q.get("status") == "open"]),
            "eventsByCategory": category_counts,
        }
        cache.set(cache_key, payload, timeout=60)
        return ok(payload)
