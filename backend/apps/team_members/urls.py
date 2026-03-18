from django.urls import path

from apps.team_members.views import TeamMemberListCreateView, TeamMemberView

urlpatterns = [
    path("", TeamMemberListCreateView.as_view()),
    path("<str:member_id>/", TeamMemberView.as_view()),
]
