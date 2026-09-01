import os
import httpx
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

    return data
