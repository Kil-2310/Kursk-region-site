from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from ..base import Base


class Media(Base):
    __tablename__ = "media"

    media_id = Column(Integer, primary_key=True)
    file_name = Column(String(255), nullable=False)
    file_url = Column(String(512), nullable=False)
    s3_key = Column(String(512), unique=True, nullable=False)
    file_size = Column(Integer, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)

    comment_id = Column(
        Integer, ForeignKey("comment.comment_id"), nullable=False, unique=True
    )

    # Связь 1 к 1 с таблицей комментариев
    comment = relationship(
        "Comment", uselist=False, back_populates="media", cascade="all"
    )
