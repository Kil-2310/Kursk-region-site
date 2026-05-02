from datetime import datetime

from typing import Optional
from pydantic import BaseModel, Field, validator, EmailStr
from email_validator import validate_email, EmailNotValidError

from ..base_schemas import ServerBoolAnswer


class FeedbackCreate(BaseModel):
    """Модель для создания письма автору"""

    email: Optional[str] = Field(None, description="Email пользователя")
    content: str = Field(..., min_length=1, max_length=1000)

    @validator("email")
    def validate_email(cls, v):
        """Валидация email с помощью библиотеки email-validator"""
        if v:
            try:
                validate_email(v, check_deliverability=False)
                return v
            except EmailNotValidError as e:
                raise ValueError(f"Неверный формат email: {str(e)}")

        return v


class UserCreate(BaseModel):
    """Модель создания нового пользователя"""

    email: EmailStr
    full_name: str = Field(..., min_length=1, max_length=100)


class UserCreateResponse(ServerBoolAnswer):
    """Ответ после создания пользователя"""

    user_id: int


class UserLoginJWT(ServerBoolAnswer):
    jwt_token: str


class UserEmail(BaseModel):
    email: EmailStr


class TemporaryCode(BaseModel):
    code: str


class UserProfile(ServerBoolAnswer):
    user_id: int
    full_name: str
    email: EmailStr
    created_at: datetime
    verified: bool
