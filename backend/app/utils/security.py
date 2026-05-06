import hashlib
import secrets
import string

from ..config_data import SECRET_SALT_KEY


def generate_numeric_code() -> str:
    """Генерация числового кода (4 символа)"""
    return "".join(secrets.choice(string.digits) for _ in range(4))


def hash_code(code: str) -> str:
    """Хэширование кода с помощью SHA256 и соли"""
    salt = SECRET_SALT_KEY
    return hashlib.sha256(f"{code}{salt}".encode()).hexdigest()


def verify_code(plain_code: str, hashed_code: str) -> bool:
    """Проверка кода"""
    return hash_code(plain_code) == hashed_code
