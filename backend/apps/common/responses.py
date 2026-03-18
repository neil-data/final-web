from typing import Any

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler as drf_exception_handler

from apps.common.middleware import request_id_ctx


def ok(data: Any = None, message: str = "OK", code: int = status.HTTP_200_OK) -> Response:
    return Response(
        {
            "success": True,
            "message": message,
            "data": data,
            "errors": None,
            "requestId": request_id_ctx.get("-"),
        },
        status=code,
    )


def fail(message: str, errors: Any = None, code: int = status.HTTP_400_BAD_REQUEST) -> Response:
    return Response(
        {
            "success": False,
            "message": message,
            "data": None,
            "errors": errors,
            "requestId": request_id_ctx.get("-"),
        },
        status=code,
    )


def exception_handler(exc, context):
    response = drf_exception_handler(exc, context)
    if response is None:
        return fail("Internal server error", code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return fail("Request failed", errors=response.data, code=response.status_code)

