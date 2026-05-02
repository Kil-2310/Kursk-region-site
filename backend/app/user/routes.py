from fastapi import Depends, FastAPI, Request, Response
from fastapi_csrf_protect import CsrfProtect
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_session
from .schemas import *
from ..base_schemas import ServerBoolAnswer
from ..config_data import SMTP_USER, logger
from .manager import UserManager
from ..temporary_code.manager import ManagerTemporaryCode
from ..celery.celery_app import celery_send_email
from ..utils.jwt_token import jwt_token


def register_user_routes(app: FastAPI):
    """Отправка комментария на почту"""

    @app.post(
        "/api/user/send_feedback",
        status_code=200,
        tags=["user send feedback"],
        summary="Отправка письма на почту автора",
        response_model=ServerBoolAnswer,
    )
    async def rout_send_feedback(
        feedback: FeedbackCreate,
        request: Request,
        csrf_protect: CsrfProtect = Depends(),
    ) -> ServerBoolAnswer:
        """Отправка письма на почту автора"""

        await csrf_protect.validate_csrf(request)

        logger.debug("Отправка письма на почту автора")

        email = feedback.email
        content = feedback.content

        if email:
            author_content = f"{content} User email: {email}"

            celery_send_email.delay(
                receiver=email,
                subject="Благодарность пользователю",
                content=None,
                file_name_message="gratitude_for_user.html",
            )
        else:
            author_content = f"{content} User email не указан"

        celery_send_email.delay(
            receiver=SMTP_USER,
            subject="Новый отзыв от пользователя",
            content=author_content,
            file_name_message="message_for_me.html",
        )

        return ServerBoolAnswer()

    """Регистрация пользователей"""

    @app.post(
        "/api/user/registration/temporary_code",
        status_code=200,
        tags=["user registration"],
        summary="Регистрация пользователя без подтверждения аккаунта",
        response_model=UserCreateResponse,
    )
    async def route_registration(
        user_data: UserCreate,
        response: Response,
        request: Request,
        session: AsyncSession = Depends(get_session),
        csrf_protect: CsrfProtect = Depends(),
    ) -> UserCreateResponse:
        """Регистрация пользователя без подтверждения аккаунта"""
        logger.debug("Регистрация пользователя без подтверждения аккаунта")

        await csrf_protect.validate_csrf(request)

        email = user_data.email
        full_name = user_data.full_name

        # Проверка отсутствия пользователя пред регистрацией
        await UserManager.check_absence(session, email)

        # Создание нового пользователя без подтверждения аккаунта
        new_user = await UserManager.register(session, full_name, email)

        # Генерация кода и отправка пользователю на email для подтверждения аккаунта
        await ManagerTemporaryCode.create_temporary_code(session, email, new_user)

        response.set_cookie(
            key="email",
            value=user_data.email,
            httponly=True,
            secure=False,
            samesite="lax",
            max_age=900,
        )

        return UserCreateResponse(
            user_id=new_user.user_id,
        )

    @app.patch(
        "/api/user/registration/mail_confirmation",
        status_code=200,
        tags=["user registration"],
        summary="Подтверждеине почты для регистрации аккаунта",
        response_model=ServerBoolAnswer,
    )
    async def route_mail_confirmation(
        temporary_code: TemporaryCode,
        request: Request,
        session: AsyncSession = Depends(get_session),
        csrf_protect: CsrfProtect = Depends(),
    ) -> ServerBoolAnswer:
        """Подтверждеине почты для регистрации аккаунта"""
        logger.debug("Подтверждеине почты для регистрации аккаунта")

        await csrf_protect.validate_csrf(request)

        code = temporary_code.code

        email = request.cookies.get("email")

        # Подтверждение аккаунта
        await UserManager.code_confirmation(session, code, email)

        return ServerBoolAnswer()

    @app.post(
        "/api/user/registration/repeated_temporary_code",
        status_code=200,
        tags=["user registration"],
        summary="Повторная отправка кода для верификации аккаунта по истечению временного кода",
        response_model=ServerBoolAnswer,
    )
    async def route_repeated_temporary_code(
        email: UserEmail,
        response: Response,
        request: Request,
        session: AsyncSession = Depends(get_session),
        csrf_protect: CsrfProtect = Depends(),
    ) -> ServerBoolAnswer:
        """Повторная отправка кода для верификации аккаунта по истечению временного кода"""

        logger.debug(
            "Повторная отправка кода для верификации аккаунта по истечению временного кода"
        )

        await csrf_protect.validate_csrf(request)

        user_email = email.email

        user_obj = await UserManager.check_availability(session, user_email)

        await ManagerTemporaryCode.create_temporary_code(session, user_email, user_obj)

        response.set_cookie(
            key="email",
            value=user_email,
            httponly=True,
            secure=False,
            samesite="lax",
            max_age=900,
        )

        return ServerBoolAnswer()

    @app.patch(
        "/api/user/registration/repeat_mail_confirmation",
        status_code=200,
        tags=["user registration"],
        summary="Подтверждение повторного кода регистрации",
        response_model=ServerBoolAnswer,
    )
    async def route_repeat_mail_confirmation(
        temporary_code: TemporaryCode,
        request: Request,
        csrf_protect: CsrfProtect = Depends(),
        session: AsyncSession = Depends(get_session),
    ) -> ServerBoolAnswer:
        """Подтверждение повторного кода регистрации"""

        logger.debug("Подтверждение повторного кода регистрации")

        await csrf_protect.validate_csrf(request)

        email = request.cookies.get("email")

        code = temporary_code.code

        await UserManager.code_confirmation(session, code, email)

        return ServerBoolAnswer()

    """Вход в аккаунт"""

    @app.post(
        "/api/user/login/temporary_code",
        status_code=200,
        tags=["user login"],
        summary="Отправка кода для входа в аккаунт",
        response_model=ServerBoolAnswer,
    )
    async def route_login(
        email: UserEmail,
        response: Response,
        request: Request,
        session: AsyncSession = Depends(get_session),
        csrf_protect: CsrfProtect = Depends(),
    ) -> ServerBoolAnswer:
        """Отправка кода для входа в аккаунт"""

        logger.debug("Отправка кода для входа в аккаунт")

        await csrf_protect.validate_csrf(request)

        user_email = email.email

        user_obj = await UserManager.check_availability(session, user_email)

        await ManagerTemporaryCode.create_temporary_code(session, user_email, user_obj)

        response.set_cookie(
            key="email",
            value=user_email,
            httponly=True,
            secure=False,
            samesite="lax",
            max_age=900,
        )

        return ServerBoolAnswer()

    @app.get(
        "/api/user/login/mail_confirmation",
        status_code=200,
        tags=["user login"],
        summary="Подтверждение кода для входа в аккаунт",
        response_model=ServerBoolAnswer,
    )
    async def route_login_temporary_code(
        temporary_code: TemporaryCode,
        request: Request,
        response: Response,
        session: AsyncSession = Depends(get_session),
        csrf_protect: CsrfProtect = Depends(),
    ) -> ServerBoolAnswer:
        """Подтверждение кода для входа в аккаунт"""

        logger.debug("Подтверждение кода для входа в аккаунт")

        await csrf_protect.validate_csrf(request)

        code = temporary_code.code

        email = request.cookies.get("email")

        user_obj = await UserManager.code_confirmation_login(session, code, email)

        token = jwt_token.create(
            user_id=user_obj.user_id,
            role=user_obj.role,
        )

        response.set_cookie(
            key="jwt_token",
            value=token,
            httponly=True,
            secure=False,
            samesite="lax",
            max_age=900,
        )

        return ServerBoolAnswer()

    @app.delete(
        "/api/user/login/logout",
        status_code=200,
        tags=["user login"],
        summary="Выход из аккаунта",
        response_model=ServerBoolAnswer,
    )
    async def route_logout(response: Response) -> ServerBoolAnswer:

        response.delete_cookie(key="jwt_token")

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
        csrf_protect: CsrfProtect = Depends(),
    ) -> UserProfile:
        """Получение данных профидя пользователя"""

        logger.debug("Получение данных профидя пользователя")

        await csrf_protect.validate_csrf(request)

        token = request.cookies.get("jwt_token")
        user_id, role = jwt_token.read(token)

        user_obj = await UserManager.get_by_id(session, user_id)

        return UserProfile(
            user_id=user_obj.user_id,
            full_name=user_obj.full_name,
            email=user_obj.email,
            created_at=user_obj.created_at,
            verified=user_obj.verified,
        )
