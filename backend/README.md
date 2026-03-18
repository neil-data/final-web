# GDGOC Backend (Django + DRF)

This backend is implemented end-to-end with modular apps and in-memory storage (no DB business dependency).

## Stack

- Django 5
- Django REST Framework
- CORS Headers
- In-memory repository layer (`repositories/memory_store/store.py`)
- Built-in load controls (DRF throttling + GZip + cache)

## Run

From `backend/`:

1. Create virtual environment
2. Install requirements
3. Run server

```bash
pip install -r requirements.txt
python manage.py runserver 8000
```

Base URL: `http://127.0.0.1:8000/api/v1/`

## Load Handling (Implemented)

- DRF throttling configured in `config/settings.py`
	- `anon`: `DRF_THROTTLE_ANON` (default `120/min`)
	- `user`: `DRF_THROTTLE_USER` (default `600/min`)
	- `auth`: `DRF_THROTTLE_AUTH` (default `30/min`)
- Auth endpoints (`student/admin login`) use scoped throttle `auth`.
- GZip middleware enabled for lighter responses.
- In-memory caching enabled (`LocMemCache`) for short-lived hot-path caching readiness.

## Production Load Balancing

- Gunicorn worker tuning: `gunicorn.conf.py`
- Nginx upstream load balancer template: `deploy/nginx-lb.conf`

Example multi-instance run (same machine):

```bash
gunicorn config.wsgi:application -c gunicorn.conf.py --bind 127.0.0.1:8000
gunicorn config.wsgi:application -c gunicorn.conf.py --bind 127.0.0.1:8001
```

Then point Nginx to both upstream backends using `deploy/nginx-lb.conf`.

## API Modules

- `GET /api/v1/health/`
- `POST /api/v1/auth/student/login/`
- `POST /api/v1/auth/admin/login/`
- `GET /api/v1/auth/me/`
- `POST /api/v1/auth/logout/`

- `GET/POST /api/v1/users/`
- `GET/PATCH/DELETE /api/v1/users/{user_id}/`
- `PATCH /api/v1/users/{user_id}/points/`
- `PATCH /api/v1/users/{user_id}/status/`

- `GET/POST /api/v1/events/`
- `GET/PATCH/DELETE /api/v1/events/{event_id}/`

- `GET/POST /api/v1/registrations/`
- `PATCH/DELETE /api/v1/registrations/{registration_id}/`

- `GET/POST /api/v1/queries/`
- `PATCH /api/v1/queries/{query_id}/reply/`

- `GET/POST /api/v1/media/`
- `DELETE /api/v1/media/{media_id}/`

- `GET/POST /api/v1/announcements/`
- `PATCH/DELETE /api/v1/announcements/{announcement_id}/`

- `GET /api/v1/leaderboard/`
- `GET /api/v1/analytics/summary/`
- `GET/PATCH /api/v1/settings/`

## Auth Pattern

1. Login endpoint returns `token`.
2. Send header on protected APIs:

```http
Authorization: Bearer <token>
```

## Quick Verification Checklist

1. Health check works (`/health/`).
2. Student login returns token.
3. Admin login (role: leader) returns token.
4. Protected route without token returns `401`.
5. Protected admin route with student token returns `403`.
6. Create event, create registration, then list events shows updated `registered` count.
7. Create contact query, reply from admin route, query status becomes `replied`.
8. Hit login endpoint repeatedly and confirm throttling starts returning 429 after threshold.

## Notes

- Storage is currently in memory; restart will reset state.
- Frontend can now integrate against these APIs and remove localStorage/mock-based flows gradually.
- Next upgrade step: replace memory repository with PostgreSQL repository while keeping service/API contracts unchanged.
