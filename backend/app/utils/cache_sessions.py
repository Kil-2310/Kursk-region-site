import json
from typing import Any, Optional

import redis.asyncio as redis
from app.config_data.config import REDIS_SESSIONS


class RedisCache:
    def __init__(self):
        self.redis: Optional[redis.Redis] = None

    async def connect(self):
        """Устанавливка соединения с Redis"""
        self.redis = await redis.from_url(REDIS_SESSIONS, decode_responses=True)

    async def disconnect(self):
        """Закрытие соединения с Redis"""
        if self.redis:
            await self.redis.close()

    async def get(self, key: str) -> Any:
        """Получение данных из кеша по ключу"""
        if not self.redis:
            return None
        data = await self.redis.get(key)
        if data:
            try:
                return json.loads(data)
            except json.JSONDecodeError:
                return data
        return None

    async def set(self, key: str, value: Any, expire: int = 300):
        """Сохраняет данные в кеш"""
        if not self.redis:
            return
        if not isinstance(value, str):
            value = json.dumps(value, default=str)
        await self.redis.set(key, value, ex=expire)

    async def delete(self, key: str):
        """Удаляет данные из кеша по ключу"""
        if self.redis:
            await self.redis.delete(key)

    async def exists(self, key: str) -> bool:
        """Проверяет существование ключа в кеше"""
        if not self.redis:
            return False
        return bool(await self.redis.exists(key))


cache = RedisCache()
