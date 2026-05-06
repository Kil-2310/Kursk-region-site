from app.middleware import limiter
from app.utils.cache_sessions import cache
from fastapi import Depends, FastAPI, Request, Response
from sqlalchemy.ext.asyncio import AsyncSession

from ..base_schemas import ServerBoolAnswer
from ..celery.celery_app import celery_send_email
from ..config_data import SMTP_USER, logger
from ..database import get_session
from ..temporary_code.manager import ManagerTemporaryCode
from ..utils.functions import cookie_configuration
from ..utils.jwt_token import jwt_token
from .manager import UserManager
from .model import User
from .schemas import *


def register_user_routes(app: FastAPI):
    """Отправка комментария на почту"""

    @app.post(
        "/api/user/send_feedback",
        status_code=200,
        tags=["user send feedback"],
        summary="Отправка письма на почту автора",
        response_model=ServerBoolAnswer,
    )
    @limiter.limit("3/minute")
    async def rout_send_feedback(
        feedback: FeedbackCreate,
        request: Request,
    ) -> ServerBoolAnswer:
        """Отправка письма на почту автора"""
        logger.debug("Отправка письма на почту автора")

        # Бизнес-логика
        post_email = feedback.email
        post_content = feedback.content

        if post_email:
            author_content = f"{post_content} User email: {post_email}"

            celery_send_email.delay(
                receiver=post_email,
                subject="Благодарность пользователю",
                content=None,
                file_name_message="gratitude_for_user.html",
            )
        else:
            author_content = f"{post_content} User email не указан"

        celery_send_email.delay(
            receiver=SMTP_USER,
            subject="Новый отзыв от пользователя",
            content=author_content,
            file_name_message="message_for_me.html",
        )

        # Response
        return ServerBoolAnswer()

    """Регистрация пользователей"""

    @app.post(
        "/api/user/registration",
        status_code=200,
        tags=["user registration"],
        summary="Регистрация пользователя",
        response_model=UserCreateResponse,
    )
    @limiter.limit("2/minute")
    async def route_registration(
        user_data: UserCreate,
        response: Response,
        request: Request,
        session: AsyncSession = Depends(get_session),
    ) -> UserCreateResponse:
        """Регистрация пользователя"""
        logger.debug("Регистрация пользователя")

        # Бизнес-логика
        post_email = user_data.email
        post_full_name = user_data.full_name

        await UserManager.check_absence(session, post_email)
        new_user = await UserManager.register(session, post_full_name, post_email)
        await ManagerTemporaryCode.create_temporary_code(session, post_email, new_user)

        cookie_configuration(response, "email", post_email)

        # Response
        return UserCreateResponse(
            user_id=new_user.user_id,
        )

    """Вход в аккаунт"""

    @app.post(
        "/api/user/login/temporary_code",
        status_code=200,
        tags=["user login"],
        summary="Отправка кода для входа в аккаунт",
        response_model=ServerBoolAnswer,
    )
    @limiter.limit("2/minute")
    async def route_login(
        user_email: UserEmail,
        response: Response,
        request: Request,
        session: AsyncSession = Depends(get_session),
    ) -> ServerBoolAnswer:
        """Отправка кода для входа в аккаунт"""
        logger.debug("Отправка кода для входа в аккаунт")

        # Бизнес-логика
        post_email = user_email.email
        user_obj = await UserManager.check_availability(session, post_email)
        await ManagerTemporaryCode.create_temporary_code(session, post_email, user_obj)

        cookie_configuration(response, "email", post_email)

        # Request
        return ServerBoolAnswer()

    @app.post(
        "/api/user/login/mail_confirmation",
        status_code=200,
        tags=["user login"],
        summary="Подтверждение кода для входа в аккаунт",
        response_model=ServerBoolAnswer,
    )
    @limiter.limit("2/minute")
    async def route_login_temporary_code(
        temporary_code: TemporaryCode,
        request: Request,
        response: Response,
        session: AsyncSession = Depends(get_session),
    ) -> ServerBoolAnswer:
        """Подтверждение кода для входа в аккаунт"""
        logger.debug("Подтверждение кода для входа в аккаунт")

        # Бизнес-логика
        post_code = temporary_code.code
        cookie_email = request.cookies.get("email")

        user_obj = await UserManager.code_confirmation_login(
            session, post_code, cookie_email
        )

        # Кеширование пользователя на 2 час
        cache_key = f"user:{user_obj.user_id}"
        user_data = {
            "user_id": user_obj.user_id,
            "full_name": user_obj.full_name,
            "email": user_obj.email,
            "role": user_obj.role,
            "created_at": user_obj.created_at,
        }

        await cache.set(cache_key, user_data, expire=7200)

        token = jwt_token.create(
            user_id=user_obj.user_id,
            role=user_obj.role,
        )

        cookie_configuration(response, "jwt_token", token)

        # Request
        return ServerBoolAnswer()

    @app.delete(
        "/api/user/login/logout",
        status_code=200,
        tags=["user login"],
        summary="Выход из аккаунта",
        response_model=ServerBoolAnswer,
    )
    @limiter.limit("2/minute")
    async def route_logout(
        response: Response,
        request: Request,
    ) -> ServerBoolAnswer:
        """Выход из аккаунта"""
        logger.debug("Выход из аккаунта")

        # Бизнес-логика
        response.delete_cookie(key="jwt_token")

        # Request
        return ServerBoolAnswer()

    """Получение данных пользователя"""

    @app.get(
        "/api/user/profile",
        status_code=200,
        tags=["user profile"],
        summary="Получение данных профидя пользователя",
        response_model=UserProfile,
    )
    async def route_profile(
        request: Request,
        session: AsyncSession = Depends(get_session),
    ) -> UserProfile:
        """Получение данных профидя пользователя"""
        logger.debug("Получение данных профидя пользователя")

        # Получение и проверка токена
        user_id, role = jwt_token.read(request.cookies.get("jwt_token"))

        # Бизнес-логика
        cache_key = f"user:{user_id}"
        user_cache = await cache.get(cache_key)

        if not user_cache:
            user_obj = await UserManager.get_by_id(session, user_id)
        else:
            user_obj = User(**user_cache)

        # Request
        return UserProfile(
            user_id=user_obj.user_id,
            full_name=user_obj.full_name,
            email=user_obj.email,
            created_at=user_obj.created_at,
        )
