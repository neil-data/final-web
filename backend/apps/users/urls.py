from django.urls import path

from apps.users.views import UserDetailView, UserListView, UserPointsView, UserStatusView

urlpatterns = [
    path("", UserListView.as_view()),
    path("<str:user_id>/", UserDetailView.as_view()),
    path("<str:user_id>/points/", UserPointsView.as_view()),
    path("<str:user_id>/status/", UserStatusView.as_view()),
]
