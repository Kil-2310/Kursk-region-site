from fastapi import FastAPI, Depends, Request
from fastapi.responses import JSONResponse
from fastapi_csrf_protect import CsrfProtect
from pydantic import BaseModel

from app.config_data import CSRF_TOKEN, IS_TESTING


class CsrfSettings(BaseModel):
    """Настройки CSRF защиты"""
    secret_key: str = CSRF_TOKEN
    cookie_key: str = "fastapi-csrf-token"
    header_key: str = "X-CSRF-Token"
    cookie_path: str = "/"
    cookie_httponly: bool = True
    cookie_samesite: str = "lax"
    cookie_secure: bool = False if not IS_TESTING else True # cookie только по HTTPS

def setup_csrf_protect(app: FastAPI):
    @CsrfProtect.load_config
    def get_csrf_config():
        return CsrfSettings()

    @app.get("/api/csrf_token", tags=["CSRF"])
    async def get_csrf_token(
            request: Request,
            csrf_protect: CsrfProtect = Depends()
    ):
        """Получения CSRF токена"""
        csrf_token, signed_token = csrf_protect.generate_csrf_tokens()

        response = JSONResponse({"csrf_token": csrf_token})

        # Установка подписки
        response.set_cookie(
            key="fastapi-csrf-token",
            value=signed_token,
            httponly=True,
            samesite="lax",
            max_age=3600,
        )

        return response
