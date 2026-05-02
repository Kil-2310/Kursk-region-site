from fastapi import Depends, FastAPI, Request, Response, File, UploadFile
from fastapi_csrf_protect import CsrfProtect
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_session
from .schemas import CreateCommentResponse
from ..config_data import logger
from ..utils.jwt_token import jwt_token
from ..comment.manager import CommentManager
from .manager import MediaManager


def register_media_routes(app: FastAPI):

    @app.post(
        "/api/media",
        status_code=200,
        tags=["media"],
        summary="Загрузка картинки для комментария",
        response_model=CreateCommentResponse,
    )
    async def route_media(
        request: Request,
        file: UploadFile = File(..., description="Выберете медиафайл для загрузки"),
        csrf_protect: CsrfProtect = Depends(),
        session: AsyncSession = Depends(get_session),
    ) -> CreateCommentResponse:
        """Загрузка картинки для комментария"""
        logger.debug("Загрузка картинки для комментария")

        # Поверка csrf
        await csrf_protect.validate_csrf(request)

        # Получение и проверка токена
        token = request.cookies.get("jwt_token")
        user_id, role = jwt_token.read(token)

        # Бизнес-логика
        comment_obg = await CommentManager.check_availability_by_user_id(
            session, user_id
        )
        media_obj = await MediaManager.create(session, file, comment_obg.comment_id)

        return CreateCommentResponse(
            media_id=media_obj.media_id,
            file_url=media_obj.file_url,
            file_name=media_obj.file_name,
        )
