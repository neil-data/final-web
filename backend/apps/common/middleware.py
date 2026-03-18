import logging
import time
from contextvars import ContextVar
from uuid import uuid4


request_id_ctx: ContextVar[str] = ContextVar("request_id", default="-")


class RequestIdLogFilter(logging.Filter):
    def filter(self, record):
        record.request_id = request_id_ctx.get("-")
        return True


class RequestContextMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.logger = logging.getLogger("apps.common.request")

    def __call__(self, request):
        request_id = request.headers.get("X-Request-ID") or uuid4().hex
        request_id_ctx.set(request_id)
        request.request_id = request_id
        start = time.perf_counter()

        response = self.get_response(request)

        elapsed_ms = int((time.perf_counter() - start) * 1000)
        response["X-Request-ID"] = request_id
        response["X-Response-Time-ms"] = str(elapsed_ms)
        self.logger.info("%s %s status=%s duration_ms=%s", request.method, request.path, getattr(response, "status_code", "-"), elapsed_ms)
        return response
