from django.urls import path

from apps.registrations.views import RegistrationListCreateView, RegistrationView

urlpatterns = [
    path("", RegistrationListCreateView.as_view()),
    path("<str:registration_id>/", RegistrationView.as_view()),
]
