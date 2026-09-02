import os
import ssl
import httpx
import smtplib
from email.message import EmailMessage
from email.utils import formataddr
from typing import Literal
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, model_validator


# server:
app = FastAPI()

load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
) 

# Schema for validating contact data received from the client:
class ContactData(BaseModel):
    email: EmailStr
    name: str = Field(min_length=1, max_length=100)
    message: str = Field(min_length=1, max_length=5000)
    customRole: str = Field(max_length=50)
    projectType: Literal[
        "Machine Learning",
        "Software Engineer",
        "Data Engineering",
        "Consultation",
        "Other"
    ]
    turnstile_token: str = Field(min_length=1) #cloudflare token 
    @model_validator(mode="after")
    def check_project_type(self):
        if self.projectType == "Other" and not self.customRole:
            raise ValueError("Custom Role cannot be empty")
        return self


# verify the cloudflare token
async def verify_turnstile(token: str) -> bool:
    secret_key = os.getenv("TURNSTILE_SECRET_KEY")

    if not secret_key:
        raise RuntimeError("TURNSTILE_SECRET_KEY is not configured")

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            data={
                "secret": secret_key,
                "response": token,
            },
        )

    result = response.json()

    return result.get("success", False)


# function to send mail:
def send_email(data: ContactData):
    gmail_address = os.getenv("GMAIL_ADDRESS")
    contact_recipient = os.getenv("CONTACT_RECIPIENT")
    gmail_app_password = os.getenv("GMAIL_APP_PASSWORD")
    
    if not gmail_address or not contact_recipient or not gmail_app_password:
        raise RuntimeError('Gmail configuration is not complete')

    message = EmailMessage()
    
    message["From"] = f"Anindya's Portfolio <{gmail_address}>"
    message["To"] = contact_recipient
    message["Reply-To"] = data.email
    message["Subject"] = "New Portfolio Contact Message"
    
    email_body = (
        f"Name: {data.name}\n"
        f"Email: {data.email}\n"
        f"Project Type: {data.projectType}\n"
    )

    if data.projectType == "Other":
        email_body += f"Custom Role: {data.customRole}\n"

    email_body += (
        f"\n"
        f"Message:\n"
        f"{data.message}"
    )

    message.set_content(email_body)
    
    tls_context = ssl.create_default_context()
    try:
        with smtplib.SMTP("smtp.gmail.com", 587, timeout=10) as server:
            server.starttls(context=tls_context)
            server.login(user=gmail_address, password= gmail_app_password)
            server.send_message(msg=message)
    except (smtplib.SMTPException, OSError):
        raise RuntimeError('Email delivery failed') from None
    
    
    
    
@app.get("/")
def root():
    return f"Running server..."

@app.post("/contact")
async def send_contact_data(data: ContactData):
    verified_turnstile = await verify_turnstile(data.turnstile_token)
    
    if not verified_turnstile:
        raise HTTPException(
            status_code=403,
            detail="Turnstile verification failed",
        )
    
    try:
        send_email(data=data)
    except RuntimeError:
        raise HTTPException(
            status_code=500,
            detail="Unable to send your message. Please try again later.",
        )
        
    return {'sucess': True}


