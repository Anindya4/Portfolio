"""
--TODO--:
POST /contact
├── ✅ successful request → 200
├── ❌ Turnstile failure → 403
├── ❌ rate limit exceeded → 429
├── ❌ Redis failure → fail-open
├── ❌ email sending failure → 500
└── 🔒 email contents / headers
"""

import pytest
from fastapi.testclient import TestClient

from backend.server import app


client = TestClient(app)


def valid_payload():
    return {
        "name": "John Doe",
        "email": "visitor@example.com",
        "message": "Hello, I liked your portfolio!",
        "customRole": "",
        "projectType": "Software Engineer",
        "turnstile_token": "test-token",
    }


# ---------------------------------------------------------------------------
# Fake Redis
# ---------------------------------------------------------------------------

class FakeRedis:
    def __init__(self):
        self.count = 0
        self.expire_called = False

    async def incr(self, key):
        self.count += 1
        return self.count

    async def ttl(self, key):
        if self.count == 0:
            return -1

        if self.expire_called:
            return 3600

        return -1

    async def expire(self, key, seconds):
        self.expire_called = True


class BrokenRedis:
    async def incr(self, key):
        raise RuntimeError("Redis unavailable")


# ---------------------------------------------------------------------------
# Successful request
# ---------------------------------------------------------------------------

def test_contact_success(monkeypatch):
    async def mock_turnstile(token):
        return True

    def mock_send_email(data):
        pass

    async def mock_rate_limit(cip):
        return True, 0

    monkeypatch.setattr(
        "backend.server.verify_turnstile",
        mock_turnstile,
    )
    monkeypatch.setattr(
        "backend.server.send_email",
        mock_send_email,
    )
    monkeypatch.setattr(
        "backend.server.check_rate_limit",
        mock_rate_limit,
    )

    response = client.post("/contact", json=valid_payload())

    assert response.status_code == 200
    assert response.json() == {"success": True}


# ---------------------------------------------------------------------------
# Turnstile failure
# ---------------------------------------------------------------------------

def test_contact_turnstile_failure(monkeypatch):
    async def mock_turnstile(token):
        return False

    async def mock_rate_limit(cip):
        return True, 0

    monkeypatch.setattr(
        "backend.server.verify_turnstile",
        mock_turnstile,
    )
    monkeypatch.setattr(
        "backend.server.check_rate_limit",
        mock_rate_limit,
    )

    response = client.post("/contact", json=valid_payload())

    assert response.status_code == 403
    assert response.json() == {
        "detail": "Turnstile verification failed"
    }


# ---------------------------------------------------------------------------
# Rate limiting
# ---------------------------------------------------------------------------

def test_contact_rate_limit_blocks_sixth_request(monkeypatch):
    fake_redis = FakeRedis()

    monkeypatch.setattr(
        "backend.server.redis",
        fake_redis,
    )

    async def mock_turnstile(token):
        return True

    def mock_send_email(data):
        pass

    monkeypatch.setattr(
        "backend.server.verify_turnstile",
        mock_turnstile,
    )
    monkeypatch.setattr(
        "backend.server.send_email",
        mock_send_email,
    )

    responses = [
        client.post("/contact", json=valid_payload())
        for _ in range(6)
    ]

    # First five requests are allowed.
    for response in responses[:5]:
        assert response.status_code == 200
        assert response.json() == {"success": True}

    # Sixth request is blocked.
    response = responses[5]

    assert response.status_code == 429
    assert response.json() == {
        "detail": "Too many requests. Please try again after 60 minutes."
    }
    assert response.headers["Retry-After"] == "3600"


# ---------------------------------------------------------------------------
# Redis failure -> fail open
# ---------------------------------------------------------------------------

def test_contact_redis_failure_fails_open(monkeypatch):
    monkeypatch.setattr(
        "backend.server.redis",
        BrokenRedis(),
    )

    async def mock_turnstile(token):
        return True

    def mock_send_email(data):
        pass

    monkeypatch.setattr(
        "backend.server.verify_turnstile",
        mock_turnstile,
    )
    monkeypatch.setattr(
        "backend.server.send_email",
        mock_send_email,
    )

    response = client.post("/contact", json=valid_payload())

    assert response.status_code == 200
    assert response.json() == {"success": True}


# ---------------------------------------------------------------------------
# Email failure
# ---------------------------------------------------------------------------

def test_contact_email_failure_returns_500(monkeypatch):
    async def mock_turnstile(token):
        return True

    async def mock_rate_limit(cip):
        return True, 0

    def mock_send_email(data):
        raise RuntimeError("Email delivery failed")

    monkeypatch.setattr(
        "backend.server.verify_turnstile",
        mock_turnstile,
    )
    monkeypatch.setattr(
        "backend.server.check_rate_limit",
        mock_rate_limit,
    )
    monkeypatch.setattr(
        "backend.server.send_email",
        mock_send_email,
    )

    response = client.post("/contact", json=valid_payload())

    assert response.status_code == 500
    assert response.json() == {
        "detail": "Unable to send your message. Please try again later."
    }


# ---------------------------------------------------------------------------
# Request validation through API
# ---------------------------------------------------------------------------

@pytest.mark.parametrize(
    "field, value",
    [
        ("name", ""),
        ("message", ""),
        ("email", "not-an-email"),
        ("projectType", "Invalid Project"),
    ],
)
def test_contact_invalid_payload_returns_422(field, value):
    payload = valid_payload()
    payload[field] = value

    response = client.post("/contact", json=payload)

    assert response.status_code == 422


def test_contact_other_without_custom_role_returns_422():
    payload = valid_payload()
    payload["projectType"] = "Other"
    payload["customRole"] = ""

    response = client.post("/contact", json=payload)

    assert response.status_code == 422


# ---------------------------------------------------------------------------
# HTTP method
# ---------------------------------------------------------------------------

def test_contact_get_not_allowed():
    response = client.get("/contact")

    assert response.status_code == 405
    
def test_contact_malformed_json_returns_422():
    response = client.post(
        "/contact",
        content='{"name": "John Doe", "email": ',
        headers={"Content-Type": "application/json"},
    )

    assert response.status_code == 422
    
    

# ---------------------------------------------------------------------------
# CORES
# ---------------------------------------------------------------------------
def test_contact_allows_configured_cors_origin():
    response = client.options(
        "/contact",
        headers={
            "Origin": "http://localhost:3000",
            "Access-Control-Request-Method": "POST",
        },
    )

    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "http://localhost:3000"