from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from ..base import Base


class TemporaryCode(Base):
    __tablename__ = "temporary_code"

    temporary_code_id = Column(Integer, primary_key=True, index=True)
    temporary_code_value = Column(String(255), nullable=False)
    expires_at = Column(DateTime, nullable=False)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False, unique=True)

    # Связь 1 к 1 с таблицей пользователей
    user = relationship("User", uselist=False, back_populates="temporary_code")
