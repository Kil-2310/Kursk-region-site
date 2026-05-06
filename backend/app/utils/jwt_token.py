from datetime import datetime, timedelta
from typing import Tuple, Union

import jwt
from fastapi import HTTPException

from ..config_data import ALGORITHM, SECRET_KEY


class JWTManager:
    def __init__(self):
        self.secret_key = SECRET_KEY
        self.algorithm = ALGORITHM

    def create(self, user_id: int, role: str) -> str:
        """Создание токена"""

        payload = {
            "user_id": user_id,
            "role": role,
            "exp": datetime.utcnow() + timedelta(days=365),
        }
        return jwt.encode(payload, self.secret_key, algorithm=self.algorithm)

    def read(self, token: str) -> Union[Tuple[int, str], None]:
        """Чтение токена"""

        if token is None:
            raise HTTPException(status_code=401, detail="Token not found")

        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            user_id = payload.get("user_id")
            role = payload.get("role")

            if user_id is None or role is None:
                raise HTTPException(status_code=401, detail="Invalid token payload")

            return user_id, role
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token has expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")
        except Exception:
            raise HTTPException(status_code=401, detail="Invalid token")


jwt_token = JWTManager()
