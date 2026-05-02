from datetime import datetime
from typing import List

from pydantic import BaseModel

from ..base_schemas import ServerBoolAnswer


class CreateCommentRequest(BaseModel):
    """Модель создания комментария"""

    content: str


class CreateCommentResponse(ServerBoolAnswer):
    """Модель ответа после создания комментария"""

    comment_id: int


class Comment(BaseModel):
    """Сущность 1 комментария"""

    content: str
    comment_id: int
    verified: bool
    created_at: datetime


class AllCommentsResponse(ServerBoolAnswer):
    """Получение списка всех комментариев"""

    data: List[Comment]
