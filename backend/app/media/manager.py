# media/manager.py
from typing import Union
from fastapi import HTTPException, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from .model import Media
from ..utils.s3_client import s3_client


class MediaManager:

    @classmethod
    async def create(
        cls, session: AsyncSession, file: UploadFile, comment_id: int
    ) -> Media:
        """Создание медиа"""

        result = await session.execute(
            select(Media).where(Media.comment_id == comment_id)
        )
        existing_media = result.scalar_one_or_none()

        if existing_media:
            raise HTTPException(status_code=409, detail="Comment already has media")

        try:
            upload_result = await s3_client.upload_file(file=file, subfolder="comments")
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Failed to upload file to storage: {str(e)}"
            )

        # Создаем запись в БД
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
    async def delete(cls, session: AsyncSession, media_id: int) -> None:
        """Удаление медиафайла"""

        result = await session.execute(select(Media).where(Media.media_id == media_id))
        media = result.scalar_one_or_none()

        if not media:
            raise HTTPException(status_code=404, detail="Media not found")

        await s3_client.delete_file(media.s3_key)
        await session.delete(media)

    @classmethod
    async def get_by_comment_id(
        cls, session: AsyncSession, comment_id: int
    ) -> Union[Media, None]:
        """Получение медиа по ID комментария"""

        result = await session.execute(
            select(Media).where(Media.comment_id == comment_id)
        )
        return result.scalar_one_or_none()
