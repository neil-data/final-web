from django.urls import path

from apps.leaderboard.views import LeaderboardListView

urlpatterns = [
    path("", LeaderboardListView.as_view()),
]
