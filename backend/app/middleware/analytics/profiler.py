import base64
from fastapi import FastAPI, Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi_profiler import Profiler
from app.config_data import USER_USERNAME, USER_PASSWORD


class ProfilerAuthMiddleware(BaseHTTPMiddleware):
    """Middleware для защиты профайлера базовой аутентификацией"""

    async def dispatch(self, request: Request, call_next):
        # Проверяем оба варианта пути
        if request.url.path.startswith("/profiler") or request.url.path == "/profiler":
            auth_header = request.headers.get("Authorization")

            if not auth_header or not auth_header.startswith("Basic "):
                return Response(
                    "Unauthorized",
                    status_code=401,
                    headers={"WWW-Authenticate": "Basic realm='Profiler'"},
                )

            try:
                encoded = auth_header.split(" ")[1]
                decoded = base64.b64decode(encoded).decode("utf-8")
                username, password = decoded.split(":", 1)

                if username != USER_USERNAME or password != USER_PASSWORD:
                    return Response(
                        "Unauthorized",
                        status_code=401,
                        headers={"WWW-Authenticate": "Basic realm='Profiler'"}
                    )

            except Exception:
                return Response(
                    "Unauthorized",
                    status_code=401,
                    headers={"WWW-Authenticate": "Basic realm='Profiler'"}
                )

        response = await call_next(request)
        return response


def setup_profiler(app: FastAPI):
    app.add_middleware(ProfilerAuthMiddleware)
    Profiler(app)