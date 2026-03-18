from django.urls import path

from apps.events.views import EventDetailView, EventListView

urlpatterns = [
    path("", EventListView.as_view()),
    path("<str:event_id>/", EventDetailView.as_view()),
]
