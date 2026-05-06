from app.utils.cache_sessions import cache
from fastapi import FastAPI
from sqlalchemy import select

from .base import Base
from .comment.routes import register_comment_routes
from .database import async_session, engine  # init_cache,; close_cache
from .media.routes import register_media_routes
from .middleware import setup_cors_protect, setup_open_api, setup_profiler
from .user.model import User
from .user.routes import register_user_routes


def register_middleware(app: FastAPI):
    # Настройки middleware

    setup_cors_protect(app)
    setup_profiler(app)
    setup_open_api(app)


def register_routes(app: FastAPI):
    # Регистрация маршрутов

    register_user_routes(app)
    register_comment_routes(app)
    register_media_routes(app)

    return app


def create_app() -> FastAPI:
    app = FastAPI()

    register_middleware(app)
    register_routes(app)

    @app.on_event("startup")
    async def startup():
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

            await cache.connect()

        async with async_session() as session:

            db_users = await session.execute(select(User))
            object_users = db_users.scalars().all()

            if not object_users:
                users_data = [
                    User(full_name="Bob", email="kil-2310@yandex.ru"),
                ]

                session.add_all(users_data)
                await session.flush()
                await session.commit()

    @app.on_event("shutdown")
    async def shutdown():
        await engine.dispose()

        await cache.disconnect()

    return app
