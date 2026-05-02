from datetime import datetime
from sqlalchemy import Column, DateTime, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from ..base import Base


class Comment(Base):
    __tablename__ = "comment"

    comment_id = Column(Integer, autoincrement=True, primary_key=True)
    content = Column(String(120), nullable=False)
    verified = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)

    user_id = Column(Integer, ForeignKey("users.user_id"), unique=True, nullable=False)

    # Связь 1 к 1 к таблице пользователей
    user = relationship("User", uselist=False, back_populates="comment", cascade="all")

    # Связь 1 к 1 с таблицей мкдиафайлов
    media = relationship(
        "Media", uselist=False, back_populates="comment", cascade="all, delete-orphan"
    )
