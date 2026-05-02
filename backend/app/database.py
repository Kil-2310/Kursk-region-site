from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from sqlacache import configure

from .config_data.config import (
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
    REDIS_SESSIONS,
    IS_TESTING,
)

if IS_TESTING:
    engine = create_async_engine("sqlite+aiosqlite:///./develop.db", echo=True)
else:
    engine = create_async_engine(
        f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@postgres:5432/{DB_NAME}"
    )

async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


# sqlacache = configure(
#     backend=REDIS_SESSIONS,
#     models={
#         "user.model.User": {"ops": {"get", "fetch"}, "timeout": 900},
#         "temporary_code.model.TemporaryCode": {"ops": "all", "timeout": 3600},
#         "*": {"timeout": 3600},
#     },
#     default_timeout=3600,
#     prefix="sqlacache",
# )
#
#
# async def init_cache():
#     """Привязывает кэш к engine. Вызвать при запуске приложения."""
#     print("Инициализация кеша")
#     await sqlacache.bind(engine)
#
#
# async def close_cache():
#     """Закрывает соединение с Redis."""
#     await sqlacache.disconnect()
