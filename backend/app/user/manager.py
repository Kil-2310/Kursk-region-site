from datetime import datetime
from sqlalchemy.orm import selectinload

from .model import User
from fastapi import HTTPException
from sqlalchemy import select

from ..utils.security import *


class UserManager:
    @classmethod
    async def register(cls, session, full_name, email) -> User:
        """Создание нового пользователя"""

        new_user = User(full_name=full_name, email=email)

        session.add(new_user)
        await session.flush()

        return new_user

    @classmethod
    async def check_availability(cls, session, email):
        """Проверка наличия пользователя"""

        result = await session.execute(select(User).where(User.email == email))

        obj = result.scalar_one_or_none()

        if obj is None:
            raise HTTPException(status_code=404, detail="User not found")

        return obj

    @classmethod
    async def check_absence(cls, session, email):
        """Проверка отсутствия пользователя"""

        result = await session.execute(select(User).where(User.email == email))

        obj = result.scalar_one_or_none()

        if obj:
            raise HTTPException(status_code=404, detail="User already exists")

    @classmethod
    async def code_confirmation(cls, session, temporary_code, email):
        """Подтверждение аккаунта"""

        result = await session.execute(
            select(User)
            .where(User.email == email)
            .options(selectinload(User.temporary_code))
        )

        user_obj = result.scalar_one_or_none()

        if user_obj is None:
            raise HTTPException(status_code=404, detail="User not found")

        if user_obj.verified:
            raise HTTPException(status_code=404, detail="User already verified")

        if datetime.now() > user_obj.temporary_code.expires_at or email is None:
            raise HTTPException(status_code=404, detail="Temporary code expired")

        if not verify_code(
            temporary_code, user_obj.temporary_code.temporary_code_value
        ):
            raise HTTPException(status_code=404, detail="Invalid temporary code")

        user_obj.verified = True

    @classmethod
    async def code_confirmation_login(cls, session, temporary_code, email):

        result = await session.execute(
            select(User)
            .where(User.email == email)
            .options(selectinload(User.temporary_code))
        )

        user_obj = result.scalar_one_or_none()

        if user_obj is None:
            raise HTTPException(status_code=404, detail="User not found")

        if not user_obj.verified:
            raise HTTPException(status_code=404, detail="User dont verified")

        if datetime.now() > user_obj.temporary_code.expires_at or email is None:
            raise HTTPException(status_code=404, detail="Temporary code expired")

        if not verify_code(
            temporary_code, user_obj.temporary_code.temporary_code_value
        ):
            raise HTTPException(status_code=404, detail="Invalid temporary code")

        return user_obj

    @classmethod
    async def get_by_id(cls, session, id):

        result = await session.execute(select(User).where(User.user_id == id))

        user_obj = result.scalar_one_or_none()

        if user_obj is None:
            raise HTTPException(status_code=404, detail="User not found")

        return user_obj
