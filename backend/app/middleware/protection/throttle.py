from fastapi import FastAPI, Request, HTTPException
from fastapi_advanced_rate_limiter import SlidingWindowRateLimiter
from starlette.middleware.base import BaseHTTPMiddleware
import redis

from app.config_data import REDIS_CLIENT


def setup_throttle(app: FastAPI):
    """Настройка rate limiting"""

    redis_client = redis.Redis.from_url(REDIS_CLIENT, decode_responses=True)

    limiter = SlidingWindowRateLimiter(
        capacity=5,
        fill_rate=5,
        scope="ip",
        backend="redis",
        redis_client=redis_client,
    )

    def get_real_ip(request: Request) -> str:
        """Получение реального IP клиента из Nginx"""
        forwarded = request.headers.get("X-Forwarded-For")
        if forwarded:
            return forwarded.split(",")[0].strip()
        return request.client.host or "unknown"

    async def rate_limit_middleware(request: Request, call_next):
        client_ip = get_real_ip(request)

        if not limiter.allow_request(client_ip):
            raise HTTPException(
                status_code=429, detail="Too many requests. Please try again later."
            )

        response = await call_next(request)
        response.headers["X-RateLimit-Limit"] = str(limiter.capacity)
        return response

    app.add_middleware(BaseHTTPMiddleware, dispatch=rate_limit_middleware)
