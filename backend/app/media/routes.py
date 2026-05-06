from app.middleware import limiter
from fastapi import Depends, FastAPI, File, Request, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from ..comment.manager import CommentManager
from ..config_data import logger
from ..database import get_session
from ..utils.jwt_token import jwt_token
from .manager import MediaManager
from .schemas import CreateCommentResponse


def register_media_routes(app: FastAPI):

    @app.post(
        "/api/media",
        status_code=200,
        tags=["media"],
        summary="Загрузка картинки для комментария",
        response_model=CreateCommentResponse,
    )
    @limiter.limit("2/minute")
    async def route_media(
        request: Request,
        file: UploadFile = File(..., description="Выберете медиафайл для загрузки"),
        session: AsyncSession = Depends(get_session),
    ) -> CreateCommentResponse:
        """Загрузка картинки для комментария"""
        logger.debug("Загрузка картинки для комментария")

        # Получение и проверка токена
        user_id, role = jwt_token.read(request.cookies.get("jwt_token"))

        # Бизнес-логика
        comment_obg = await CommentManager.check_availability_by_user_id(
            session, user_id
        )
        await MediaManager.check_absence_by_comment(session, comment_obg)
        media_obj = await MediaManager.create(session, file, comment_obg.comment_id)

        # Request
        return CreateCommentResponse(
            media_id=media_obj.media_id,
            file_url=media_obj.file_url,
            file_name=media_obj.file_name,
        )
