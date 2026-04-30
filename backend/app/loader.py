from fastapi import FastAPI

from .user.routes import register_user_routes
from .middleware import (
    setup_throttle,
    setup_cors_protect,
    setup_csrf_protect,
    setup_profiler,
    setup_open_api
)


def register_middleware(app: FastAPI):
    # Настройки middleware
    print('Настройки middleware')
    setup_throttle(app)
    setup_csrf_protect(app)
    setup_cors_protect(app)
    setup_profiler(app)
    setup_open_api(app)


def register_routes(app: FastAPI):
    # Регистрация маршрутов
    register_user_routes(app)

    return app


def create_app() -> FastAPI:
    app = FastAPI()

    register_middleware(app)
    register_routes(app)

    return app
