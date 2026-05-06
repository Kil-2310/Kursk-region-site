from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Integer, String
from sqlalchemy.orm import relationship

from ..base import Base


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, autoincrement=True, primary_key=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    role = Column(String(10), nullable=False, default="user")
    created_at = Column(DateTime, nullable=False, default=datetime.now)

    # Связь 1 к 1 с таблицей временных кодов
    temporary_code = relationship(
        "TemporaryCode",
        uselist=False,
        back_populates="user",
        cascade="all, delete-orphan",
    )

    # Связь 1 к 1 с таблицей комментариев
    comment = relationship(
        "Comment", uselist=False, back_populates="user", cascade="all, delete-orphan"
    )
