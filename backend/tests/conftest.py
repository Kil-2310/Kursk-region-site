import pytest
from fastapi import FastAPI
import pytest_asyncio
from fastapi.testclient import TestClient
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

app_ = FastAPI()

# from backend.app.database import Base
from app.loader import register_routes

# TEST_DATABASE_URL = "sqlite+aiosqlite:///./test.db"
#
# test_engine = create_async_engine(TEST_DATABASE_URL, echo=True)
#
# TestingSessionLocal = sessionmaker(
#     test_engine, class_=AsyncSession, expire_on_commit=False
# )


# @pytest_asyncio.fixture(autouse=True, scope="function")
# async def setup_database():
#     """Создаёт таблицы перед каждым тестом и удаляет после"""
#     async with test_engine.begin() as conn:
#         await conn.run_sync(Base.metadata.create_all)
#     yield
#     async with test_engine.begin() as conn:
#         await conn.run_sync(Base.metadata.drop_all)
#     await test_engine.dispose()


@pytest.fixture(scope="function")
def app():
    """Возвращает экземпляр приложения FastAPI"""
    return register_routes(app_)


@pytest.fixture(scope="function")
def client(app):
    """Тестовый клиент FastAPI"""
    with TestClient(app) as test_client:
        yield test_client


# @pytest_asyncio.fixture(scope="function")
# async def db_session():
#     """Асинхронная сессия для прямого доступа к БД"""
#     async with TestingSessionLocal() as session:
#         yield session
#         await session.rollback()
#         await session.close()