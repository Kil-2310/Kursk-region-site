import os

from dotenv import find_dotenv, load_dotenv

if not find_dotenv():
    exit("Переменные окружения не загружены т.к отсутствует файл .env")
else:
    load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")

SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = os.getenv("SMTP_PORT")

CSRF_TOKEN = os.getenv("CSRF_TOKEN")

USER_USERNAME=os.getenv("USER_USERNAME")
USER_PASSWORD=os.getenv("USER_PASSWORD")

REDIS_BROKER = os.getenv("REDIS_BROKER")
REDIS_BACKEND = os.getenv("REDIS_BACKEND")

REDIS_CLIENT = os.getenv("REDIS_CLIENT")

REDIS_SESSIONS = os.getenv("REDIS_SESSIONS")

IS_TESTING = os.getenv("IS_TESTING") == "True"
