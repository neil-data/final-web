from django.urls import path

from apps.media_items.views import MediaListCreateView, MediaView

urlpatterns = [
    path("", MediaListCreateView.as_view()),
    path("<str:media_id>/", MediaView.as_view()),
]
