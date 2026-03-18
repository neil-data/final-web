from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
from hashlib import sha256
from secrets import token_urlsafe
from threading import RLock


def _now() -> str:
    return datetime.utcnow().isoformat() + "Z"


def _now_dt() -> datetime:
    return datetime.now(timezone.utc)


@dataclass
class MemoryStore:
    users: list[dict] = field(default_factory=list)
    events: list[dict] = field(default_factory=list)
    registrations: list[dict] = field(default_factory=list)
    queries: list[dict] = field(default_factory=list)
    media_items: list[dict] = field(default_factory=list)
    announcements: list[dict] = field(default_factory=list)
    team_members: list[dict] = field(default_factory=list)
    settings: dict = field(default_factory=dict)
    tokens: dict[str, dict] = field(default_factory=dict)
    token_ttl_seconds: int = 3600
    version: int = 1
    _id_counters: dict[str, int] = field(default_factory=dict)
    _lock: RLock = field(default_factory=RLock)

    def seed(self):
        if self.users:
            return
        self.users = []
        self.events = []
        self.media_items = []
        self.announcements = []
        self.team_members = []
        self.settings = {
            "maintenanceMode": False,
            "pointsPerEvent": 50,
            "pointsForSpeaking": 200,
            "pointsForOrganizing": 150,
            "pointsForHackathonWin": 500,
        }
        self._id_counters = {
            "u": len(self.users),
            "e": len(self.events),
            "reg": len(self.registrations),
            "q": len(self.queries),
            "m": len(self.media_items),
            "a": len(self.announcements),
            "t": len(self.team_members),
        }

    def next_id(self, prefix: str) -> str:
        with self._lock:
            self._id_counters[prefix] = self._id_counters.get(prefix, 0) + 1
            return f"{prefix}{self._id_counters[prefix]}"

    def touch(self):
        with self._lock:
            self.version += 1

    @staticmethod
    def _hash_token(token: str) -> str:
        return sha256(token.encode("utf-8")).hexdigest()

    def issue_token(self, user_id: str, email: str, role: str) -> str:
        token = token_urlsafe(32)
        token_hash = self._hash_token(token)
        issued_at = _now_dt()
        expires_at = issued_at + timedelta(seconds=self.token_ttl_seconds)
        self.tokens[token_hash] = {
            "userId": user_id,
            "email": email,
            "role": role,
            "issuedAt": issued_at.isoformat(),
            "expiresAt": expires_at.isoformat(),
        }
        return token

    def get_session(self, token: str):
        token_hash = self._hash_token(token)
        session = self.tokens.get(token_hash)
        if not session:
            return None
        expires_at = datetime.fromisoformat(session["expiresAt"])
        if expires_at < _now_dt():
            self.tokens.pop(token_hash, None)
            return None
        return session

    def revoke_token(self, token: str):
        token_hash = self._hash_token(token)
        self.tokens.pop(token_hash, None)


store = MemoryStore()
store.seed()
