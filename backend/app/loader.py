from fastapi import FastAPI

from .config_data import (
    custom_openapi,
)

from .user.routes import register_user_routes
from .comment.routes import register_comment_routes
from .media.routes import register_media_routes

from .user.model import User
from sqlalchemy import select

from .middleware import (
    setup_throttle,
    setup_cors_protect,
    setup_csrf_protect,
    setup_profiler,
    setup_open_api,
)
from .database import (
    engine,
    async_session,
    # init_cache,
    # close_cache
)
from .base import Base


def register_middleware(app: FastAPI):
    # Настройки middleware

    setup_throttle(app)
    setup_csrf_protect(app)
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
    custom_openapi(app)

    @app.on_event("startup")
    async def startup():
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

        async with async_session() as session:

            db_users = await session.execute(select(User))
            object_users = db_users.scalars().all()

            if not object_users:
                users_data = [
                    User(full_name="Bob", email="kil-2310@yandex.ru", verified=True),
                ]

                session.add_all(users_data)
                await session.flush()
                await session.commit()

        # await init_cache()

    @app.on_event("shutdown")
    async def shutdown():
        await engine.dispose()
        # await close_cache()

    return app
