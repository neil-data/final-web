import re

from apps.common.responses import fail


IAR_EMAIL_RE = re.compile(r"^[^@\s]+@iar\.ac\.in$", re.IGNORECASE)


def normalize_email(value: str) -> str:
    return (value or "").strip().lower()


def validate_iar_email(email: str):
    if not IAR_EMAIL_RE.match(email):
        return fail("Only @iar.ac.in emails are allowed")
    return None


def parse_int(value, default: int, min_value: int | None = None):
    try:
        parsed = int(value)
    except (TypeError, ValueError):
        parsed = default
    if min_value is not None:
        return max(min_value, parsed)
    return parsed
