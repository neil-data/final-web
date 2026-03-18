from django.urls import path

from apps.queries.views import QueryListCreateView, QueryReplyView

urlpatterns = [
    path("", QueryListCreateView.as_view()),
    path("<str:query_id>/reply/", QueryReplyView.as_view()),
]
