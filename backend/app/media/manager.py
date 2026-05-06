from typing import Union

from fastapi import HTTPException, UploadFile
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..comment.model import Comment
from ..utils.s3_client import s3_client
from .model import Media


class MediaManager:

    @classmethod
    async def check_absence_by_comment(cls, session, comment_obj: Comment):
        """Проверка наличия медиа у комментария"""

        await session.refresh(comment_obj, attribute_names=["media"])

        if comment_obj.media:
            raise HTTPException(status_code=409, detail="Comment already has media")

    @classmethod
    async def create(
        cls, session: AsyncSession, file: UploadFile, comment_id: int
    ) -> Media:
        """Создание медиа"""

        upload_result = await s3_client.upload_file(file=file)

        media = Media(
            file_name=upload_result["file_name"],
            file_url=upload_result["file_url"],
            s3_key=upload_result["s3_key"],
            file_size=upload_result["file_size"],
            comment_id=comment_id,
        )

        session.add(media)
        await session.flush()

        return media

    @classmethod
    async def delete(cls, session: AsyncSession, media_obj: Media) -> None:
        """Удаление медиафайла"""

        await s3_client.delete_file(media_obj.s3_key)
        await session.delete(media_obj)
