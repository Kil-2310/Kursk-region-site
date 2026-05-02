from fastapi import FastAPI, Request, Response
from fastapi.security import HTTPBasic
from starlette.middleware.base import BaseHTTPMiddleware
import base64

from app.config_data import USER_USERNAME, USER_PASSWORD

security = HTTPBasic()


def setup_open_api(app: FastAPI):
    class OpenApiProtectionMiddleware(BaseHTTPMiddleware):
        async def dispatch(self, request: Request, call_next):
            if request.url.path in ["/docs", "/openapi.json", "/redoc"]:

                auth_header = request.headers.get("Authorization")

                if not auth_header:
                    return Response(
                        "Unauthorized",
                        status_code=401,
                        headers={"WWW-Authenticate": "Basic"},
                    )

                try:
                    scheme, credentials = auth_header.split()
                    if scheme.lower() != "basic":
                        return Response("Unauthorized", status_code=401)

                    decoded = base64.b64decode(credentials).decode()
                    username, password = decoded.split(":", 1)

                    if username != USER_USERNAME or password != USER_PASSWORD:
                        return Response("Unauthorized", status_code=401)

                except Exception:
                    return Response("Unauthorized", status_code=401)

            return await call_next(request)

    app.add_middleware(OpenApiProtectionMiddleware)
