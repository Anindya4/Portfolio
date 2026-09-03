import smtplib

import pytest

from backend.server import ContactData, send_email


def valid_data():
    return ContactData(
        name="John Doe",
        email="visitor@example.com",
        message="Hello, I liked your portfolio!",
        customRole="",
        projectType="Software Engineer",
        turnstile_token="test-token",
    )


def test_send_email_builds_correct_email(monkeypatch):
    smtp_calls = {}

    class FakeSMTP:
        def __init__(self, host, port, timeout):
            smtp_calls["host"] = host
            smtp_calls["port"] = port
            smtp_calls["timeout"] = timeout

        def __enter__(self):
            return self

        def __exit__(self, exc_type, exc_value, traceback):
            pass

        def starttls(self, context):
            smtp_calls["starttls"] = True

        def login(self, user, password):
            smtp_calls["login"] = (user, password)

        def send_message(self, msg):
            smtp_calls["message"] = msg

    monkeypatch.setattr("backend.server.smtplib.SMTP", FakeSMTP)

    monkeypatch.setenv("GMAIL_ADDRESS", "portfolio@example.com")
    monkeypatch.setenv("CONTACT_RECIPIENT", "owner@example.com")
    monkeypatch.setenv("GMAIL_APP_PASSWORD", "test-password")

    send_email(valid_data())

    message = smtp_calls["message"]

    assert smtp_calls["host"] == "smtp.gmail.com"
    assert smtp_calls["port"] == 587
    assert smtp_calls["timeout"] == 10

    assert smtp_calls["starttls"] is True
    assert smtp_calls["login"] == (
        "portfolio@example.com",
        "test-password",
    )

    assert message["From"] == "Anindya's Portfolio <portfolio@example.com>"
    assert message["To"] == "owner@example.com"
    assert message["Reply-To"] == "visitor@example.com"
    assert message["Subject"] == "New Portfolio Contact Message"

    body = message.get_content()

    assert "Name: John Doe" in body
    assert "Email: visitor@example.com" in body
    assert "Project Type: Software Engineer" in body
    assert "Message:\nHello, I liked your portfolio!" in body


def test_send_email_includes_custom_role_for_other(monkeypatch):
    captured_message = {}

    class FakeSMTP:
        def __init__(self, host, port, timeout):
            pass

        def __enter__(self):
            return self

        def __exit__(self, exc_type, exc_value, traceback):
            pass

        def starttls(self, context):
            pass

        def login(self, user, password):
            pass

        def send_message(self, msg):
            captured_message["message"] = msg

    monkeypatch.setattr("backend.server.smtplib.SMTP", FakeSMTP)

    monkeypatch.setenv("GMAIL_ADDRESS", "portfolio@example.com")
    monkeypatch.setenv("CONTACT_RECIPIENT", "owner@example.com")
    monkeypatch.setenv("GMAIL_APP_PASSWORD", "test-password")

    data = valid_data()
    data.projectType = "Other"
    data.customRole = "AI Consultant"

    send_email(data)

    body = captured_message["message"].get_content()

    assert "Project Type: Other" in body
    assert "Custom Role: AI Consultant" in body


def test_send_email_missing_gmail_configuration(monkeypatch):
    monkeypatch.delenv("GMAIL_ADDRESS", raising=False)
    monkeypatch.delenv("CONTACT_RECIPIENT", raising=False)
    monkeypatch.delenv("GMAIL_APP_PASSWORD", raising=False)

    with pytest.raises(RuntimeError, match="Gmail configuration is not complete"):
        send_email(valid_data())


def test_send_email_smtp_failure(monkeypatch):
    class FakeSMTP:
        def __init__(self, host, port, timeout):
            pass

        def __enter__(self):
            return self

        def __exit__(self, exc_type, exc_value, traceback):
            pass

        def starttls(self, context):
            raise smtplib.SMTPException("TLS failed")

    monkeypatch.setattr("backend.server.smtplib.SMTP", FakeSMTP)

    monkeypatch.setenv("GMAIL_ADDRESS", "portfolio@example.com")
    monkeypatch.setenv("CONTACT_RECIPIENT", "owner@example.com")
    monkeypatch.setenv("GMAIL_APP_PASSWORD", "test-password")

    with pytest.raises(RuntimeError, match="Email delivery failed"):
        send_email(valid_data())