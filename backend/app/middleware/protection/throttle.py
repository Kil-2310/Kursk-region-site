from app.config_data import REDIS_CLIENT
from fastapi import FastAPI, Request
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

limiter = Limiter(
    key_func=get_remote_address, storage_uri=REDIS_CLIENT, headers_enabled=True
)


async def setup_throttle(app: FastAPI):
    """Настройка rate limiting"""

    app.state.limiter = limiter
    app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

    @app.middleware("http")
    async def proxy_headers_middleware(request: Request, call_next):
        forwarded = request.headers.get("X-Forwarded-For")

        if forwarded:
            request.scope["client"] = (forwarded.split(",")[0].strip(), 0)

        return await call_next(request)
