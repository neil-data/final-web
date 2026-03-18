from django.urls import path

from apps.platform_settings.views import PlatformSettingsView

urlpatterns = [
    path("", PlatformSettingsView.as_view()),
]
