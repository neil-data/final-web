from django.urls import path

from apps.authentication.views import AdminLoginView, LogoutView, MeView, StudentLoginView

urlpatterns = [
    path("student/login/", StudentLoginView.as_view()),
    path("admin/login/", AdminLoginView.as_view()),
    path("me/", MeView.as_view()),
    path("logout/", LogoutView.as_view()),
]
