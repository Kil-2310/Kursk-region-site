import string
import secrets

from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Хэширование пароля bcrypt"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Проверка пароля через bcrypt"""
    return pwd_context.verify(plain_password, hashed_password)

def generate_numeric_code(length=6):
    """Генерация числового кода"""
    numbers = string.digits
    return ''.join(secrets.choice(numbers) for _ in range(length))