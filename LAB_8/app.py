import re
import os
from typing import List, Dict, Any
from fastapi import FastAPI, status
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field, field_validator, ValidationError
import uvicorn

app = FastAPI(title="User Registration - Lab 8")

# Enable CORS for flexible local execution
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Model for strict input validation (no hardcoded static choices)
class UserProfile(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    gender: str = Field(...)
    mobile: str = Field(...)
    email: str = Field(...)
    city: str = Field(..., min_length=2, max_length=60)
    state: str = Field(..., min_length=2, max_length=60)
    country: str = Field(..., min_length=2, max_length=60)

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        clean = value.strip()
        if len(clean) < 2:
            raise ValueError("Name must be at least 2 characters long.")
        if not re.match(r"^[A-Za-z\s.'-]+$", clean):
            raise ValueError("Name can only contain alphabetic letters and spaces.")
        return clean

    @field_validator("gender")
    @classmethod
    def validate_gender(cls, value: str) -> str:
        clean = value.strip().capitalize()
        if clean not in ["Male", "Female", "Other"]:
            raise ValueError("Please select a valid gender option.")
        return clean

    @field_validator("mobile")
    @classmethod
    def validate_mobile(cls, value: str) -> str:
        digits = re.sub(r"\D", "", value.strip())
        if len(digits) != 10:
            raise ValueError("Mobile number must be exactly 10 digits.")
        return digits

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        clean = value.strip().lower()
        pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        if not re.match(pattern, clean):
            raise ValueError("Please enter a valid email address.")
        return clean

    @field_validator("city", "state", "country")
    @classmethod
    def validate_locations(cls, value: str) -> str:
        clean = value.strip()
        if len(clean) < 2:
            raise ValueError("Must be at least 2 characters long.")
        if not re.match(r"^[A-Za-z\s.'-]+$", clean):
            raise ValueError("Must contain alphabetic characters only.")
        return clean


@app.post("/api/save")
async def save_user(payload: Dict[str, Any]):
    try:
        user = UserProfile(**payload)
        return {
            "success": True,
            "message": "User data successfully validated and saved.",
            "data": user.model_dump()
        }
    except ValidationError as err:
        errors = {}
        for error in err.errors():
            field_name = error["loc"][0]
            clean_msg = error["msg"].replace("Value error, ", "")
            errors[field_name] = clean_msg
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={"success": False, "errors": errors}
        )


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.get("/")
async def root():
    return FileResponse(os.path.join(BASE_DIR, "index.html"))

@app.get("/display.html")
async def display_page():
    return FileResponse(os.path.join(BASE_DIR, "display.html"))

# Mount static directory for CSS/assets
app.mount("/", StaticFiles(directory=BASE_DIR), name="static")


if __name__ == "__main__":
    print("Starting User Registration Web Server on http://127.0.0.1:8000 ...")
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
