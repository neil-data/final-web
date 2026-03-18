import json
import logging
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from pathlib import Path


AUDIT_LOG_PATH = Path(__file__).resolve().parents[2] / "logs" / "audit.log"
AUDIT_LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
_executor = ThreadPoolExecutor(max_workers=2)
_logger = logging.getLogger("apps.common.audit")


def _write_audit(entry: dict):
    with AUDIT_LOG_PATH.open("a", encoding="utf-8") as file:
        file.write(json.dumps(entry, ensure_ascii=False) + "\n")


def audit_event(action: str, actor: str, target: str, metadata: dict | None = None):
    entry = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "action": action,
        "actor": actor,
        "target": target,
        "metadata": metadata or {},
    }
    try:
        _executor.submit(_write_audit, entry)
    except Exception as exc:
        _logger.warning("Failed to queue audit event: %s", exc)
