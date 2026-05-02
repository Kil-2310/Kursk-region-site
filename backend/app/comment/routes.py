from fastapi import Depends, FastAPI, Request, Response
from fastapi_csrf_protect import CsrfProtect
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_session
from .schemas import *
from ..base_schemas import ServerBoolAnswer
from ..config_data import logger
from ..utils.jwt_token import jwt_token
from .manager import CommentManager


def register_comment_routes(app: FastAPI):

    @app.post(
        "/api/comment/create",
        status_code=200,
        tags=["comment"],
        summary="Создание нового комментария",
        response_model=CreateCommentResponse,
    )
    async def route_comment_create(
        comment: CreateCommentRequest,
        request: Request,
        csrf_protect: CsrfProtect = Depends(),
        session: AsyncSession = Depends(get_session),
    ) -> CreateCommentResponse:
        """Создание нового комментария"""
        logger.debug("Создание нового комментария")

        # Поверка csrf
        await csrf_protect.validate_csrf(request)

        # Получение и проверка токена
        token = request.cookies.get("jwt_token")
        user_id, role = jwt_token.read(token)

        # Данные пользователя
        post_content = comment.content

        # Бизнес-логика
        await CommentManager.check_absence_by_user_id(session, user_id)
        obj = await CommentManager.create(session, post_content, user_id)

        # Response
        return CreateCommentResponse(
            comment_id=obj.comment_id,
        )

    @app.delete(
        "/api/comment/delete",
        status_code=200,
        tags=["comment"],
        summary="Удаление комментария по id",
        response_model=ServerBoolAnswer,
    )
    async def route_comment_delete(
        request: Request,
        csrf_protect: CsrfProtect = Depends(),
        session: AsyncSession = Depends(get_session),
    ) -> ServerBoolAnswer:
        """Удаление комментария по id"""
        logger.debug("Удаление комментария по id")

        # Поверка csrf
        await csrf_protect.validate_csrf(request)

        # Получение и проверка токена
        token = request.cookies.get("jwt_token")
        user_id, role = jwt_token.read(token)

        # Бизнес-логика
        comment_obj = await CommentManager.check_availability_by_user_id(
            session, user_id
        )
        CommentManager.belonging_user(user_id, comment_obj)
        await CommentManager.delete(session, user_id)

        # Response
        return ServerBoolAnswer()

    @app.get(
        "/api/comment/get_all",
        status_code=200,
        tags=["comment"],
        summary="Получение всех комментариев",
        response_model=AllCommentsResponse,
    )
    async def route_comment_get_all(
        session: AsyncSession = Depends(get_session),
    ) -> AllCommentsResponse:
        """Получение всех комментариев"""
        logger.debug("Получение всех комментариев")

        # Бизнес-логика
        comment_objs = await CommentManager.get_all(session)

        # Response
        return AllCommentsResponse(
            data=[
                Comment(
                    comment_id=comment.comment_id,
                    verified=comment.verified,
                    created_at=comment.created_at,
                    content=comment.content,
                )
                for comment in comment_objs
            ]
        )

    @app.get(
        "/api/comment/get_verified",
        status_code=200,
        tags=["comment"],
        summary="Получение верифицированных комментариев",
        response_model=AllCommentsResponse,
    )
    async def route_comment_get_verified(
        session: AsyncSession = Depends(get_session),
    ) -> AllCommentsResponse:
        """Получение верифицированных комментариев"""
        logger.debug("Получение верифицированных комментариев")

        # Бизнес-логика
        comment_objs = await CommentManager.get_all(session)

        # Response
        return AllCommentsResponse(
            data=[
                Comment(
                    comment_id=comment.comment_id,
                    verified=comment.verified,
                    created_at=comment.created_at,
                    content=comment.content,
                )
                for comment in comment_objs
            ]
        )

    @app.get(
        "/api/comment/get_unverified",
        status_code=200,
        tags=["comment"],
        summary="Получение не верифицированных комментариев",
        response_model=AllCommentsResponse,
    )
    async def route_comment_get_verified(
        session: AsyncSession = Depends(get_session),
    ) -> AllCommentsResponse:
        """Получение не верифицированных комментариев"""
        logger.debug("Получение не верифицированных комментариев")

        # Бизнес-логика
        comment_objs = await CommentManager.get_unverified(session)

        # Response
        return AllCommentsResponse(
            data=[
                Comment(
                    comment_id=comment.comment_id,
                    verified=comment.verified,
                    created_at=comment.created_at,
                    content=comment.content,
                )
                for comment in comment_objs
            ]
        )
