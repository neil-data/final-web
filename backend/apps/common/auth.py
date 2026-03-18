from functools import wraps

from rest_framework import status

from apps.common.responses import fail
from repositories.memory_store.store import store


def require_auth(view_func):
    @wraps(view_func)
    def wrapper(self, request, *args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return fail("Unauthorized", code=status.HTTP_401_UNAUTHORIZED)

        token = auth_header.replace("Bearer ", "", 1).strip()
        session = store.get_session(token)
        if not session:
            return fail("Unauthorized", code=status.HTTP_401_UNAUTHORIZED)

        request.session_user = session
        return view_func(self, request, *args, **kwargs)

    return wrapper


def require_roles(*roles):
    def decorator(view_func):
        @wraps(view_func)
        def wrapper(self, request, *args, **kwargs):
            session = getattr(request, "session_user", None)
            if not session:
                return fail("Unauthorized", code=status.HTTP_401_UNAUTHORIZED)
            if session.get("role") not in roles:
                return fail("Forbidden", code=status.HTTP_403_FORBIDDEN)
            return view_func(self, request, *args, **kwargs)

        return wrapper

    return decorator
