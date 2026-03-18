from django.core.cache import cache
from rest_framework.views import APIView

from apps.common.responses import ok
from repositories.memory_store.store import store


def _badge(points: int) -> str:
    if points >= 4200:
        return "gold"
    if points >= 3400:
        return "silver"
    if points >= 2800:
        return "bronze"
    if points >= 1800:
        return "rising-star"
    return "contributor"


class LeaderboardListView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        cache_key = f"leaderboard:v{store.version}"
        cached = cache.get(cache_key)
        if cached is not None:
            return ok(cached)

        ranked = sorted(store.users, key=lambda u: int(u.get("points", 0)), reverse=True)
        data = [
            {
                "rank": idx + 1,
                "userId": user["id"],
                "name": user["name"],
                "avatar": f"https://api.dicebear.com/7.x/avataaars/png?seed={user['name'].replace(' ', '')}",
                "points": int(user.get("points", 0)),
                "badge": _badge(int(user.get("points", 0))),
                "eventsAttended": len([r for r in store.registrations if r["userId"] == user["id"]]),
                "contributions": 0,
                "team": "Student",
            }
            for idx, user in enumerate(ranked)
        ]
        cache.set(cache_key, data, timeout=60)
        return ok(data)
