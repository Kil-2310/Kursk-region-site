from datetime import datetime, timedelta

from sqlalchemy import select

from ..celery import celery_send_email
from ..utils.security import generate_numeric_code, hash_code
from .model import TemporaryCode


class ManagerTemporaryCode:

    @classmethod
    async def create_temporary_code(cls, session, email, user_obj):
        code = generate_numeric_code()

        celery_send_email.delay(
            receiver=email,
            subject="Код подтверждения",
            content=code,
            file_name_message="temporary_code.html",
        )

        hashed_code = hash_code(code)

        result = await session.execute(
            select(TemporaryCode).where(TemporaryCode.user_id == user_obj.user_id)
        )
        existing_code = result.scalar_one_or_none()

        if existing_code:
            # Обновление существующего кода
            existing_code.temporary_code_value = hashed_code
            existing_code.expires_at = datetime.now() + timedelta(minutes=15)
            await session.flush()
        else:
            # Создание новый кодка
            new_temporary_code = TemporaryCode(
                temporary_code_value=hashed_code,
                expires_at=datetime.now() + timedelta(minutes=10),
            )
            user_obj.temporary_code = new_temporary_code

            session.add(new_temporary_code)
            await session.flush()
