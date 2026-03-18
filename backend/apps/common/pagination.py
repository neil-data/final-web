from rest_framework.pagination import PageNumberPagination


class StandardPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "pageSize"
    max_page_size = 100


def paginate_list(request, items, paginator_cls=StandardPagination):
    paginator = paginator_cls()
    page = paginator.paginate_queryset(items, request)
    payload = {
        "items": page,
        "pagination": {
            "count": paginator.page.paginator.count,
            "page": paginator.page.number,
            "pageSize": paginator.get_page_size(request),
            "hasNext": paginator.page.has_next(),
            "hasPrevious": paginator.page.has_previous(),
        },
    }
    return payload
