from django.urls import path

from apps.announcements.views import AnnouncementListCreateView, AnnouncementView

urlpatterns = [
    path("", AnnouncementListCreateView.as_view()),
    path("<str:announcement_id>/", AnnouncementView.as_view()),
]
