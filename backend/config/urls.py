from django.urls import include, path

from apps.common.views import ApiIndexView, RootView

urlpatterns = [
    path("", RootView.as_view()),
    path("api/v1", ApiIndexView.as_view()),
    path("api/v1/", include("apps.common.urls")),
    path("api/v1/auth/", include("apps.authentication.urls")),
    path("api/v1/users/", include("apps.users.urls")),
    path("api/v1/events/", include("apps.events.urls")),
    path("api/v1/registrations/", include("apps.registrations.urls")),
    path("api/v1/queries/", include("apps.queries.urls")),
    path("api/v1/media/", include("apps.media_items.urls")),
    path("api/v1/team/", include("apps.team_members.urls")),
    path("api/v1/announcements/", include("apps.announcements.urls")),
    path("api/v1/leaderboard/", include("apps.leaderboard.urls")),
    path("api/v1/analytics/", include("apps.analytics.urls")),
    path("api/v1/settings/", include("apps.platform_settings.urls")),
]
