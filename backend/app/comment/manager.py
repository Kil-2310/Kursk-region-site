from typing import Union, List

from sqlalchemy import select
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from .model import Comment


class CommentManager:
    @classmethod
    async def create(cls, session: AsyncSession, content: str, user_id: int) -> Comment:
        """Создание комментария"""

        new_comment = Comment(
            content=content,
            user_id=user_id,
        )

        session.add(new_comment)
        await session.flush()

        return new_comment

    @classmethod
    async def check_absence_by_user_id(
        cls, session: AsyncSession, user_id: int
    ) -> None:
        """Проверка отстствия комментария"""

        result = await session.execute(
            select(Comment).where(Comment.user_id == user_id)
        )

        obj = result.scalars().first()

        if obj:
            raise HTTPException(status_code=409, detail="The comment already created")

    @classmethod
    async def check_availability_by_user_id(
        cls, session: AsyncSession, user_id: int
    ) -> Union[Comment, None]:
        """Проверка наличия комментария по id пользователя"""

        result = await session.execute(
            select(Comment).where(Comment.user_id == user_id)
        )

        obj = result.scalars().first()

        if not obj:
            raise HTTPException(status_code=409, detail="The comment already created")

        return obj

    @classmethod
    async def delete(cls, session: AsyncSession, user_id: int) -> None:
        """Удаление комментария по id пользователя"""

        result = await session.execute(
            select(Comment).where(Comment.user_id == user_id)
        )

        obj = result.scalars().first()

        await session.delete(obj)

    @classmethod
    async def get_all(cls, session) -> Union[List[Comment], None]:
        """Получение всех комментариев"""

        result = await session.execute(select(Comment))

        obj = result.scalars().all()

        if not obj:
            raise HTTPException(status_code=404, detail="The comment does not exist")

        return obj

    @classmethod
    def belonging_user(cls, user_id: int, comment_obj: Comment) -> None:
        """Проверка принадлежности комментария пользователю"""

        if comment_obj.user_id != user_id:
            raise HTTPException(
                status_code=403, detail="The comment does not belong to the user"
            )

    @classmethod
    async def get_verified(cls, session) -> Union[List[Comment], None]:
        """Получение верифицированных комментариев"""

        result = await session.execute(select(Comment).where(Comment.verified == True))

        obj = result.scalars().all()

        if not obj:
            raise HTTPException(
                status_code=404, detail="The verified comment does not exist"
            )

        return obj

    @classmethod
    async def get_unverified(cls, session) -> Union[List[Comment], None]:
        """Получение не верифицированных комментариев"""

        result = await session.execute(select(Comment).where(Comment.verified == False))

        obj = result.scalars().all()

        if not obj:
            raise HTTPException(
                status_code=404, detail="The unverified comment does not exist"
            )

        return obj
