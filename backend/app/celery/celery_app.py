from celery import Celery
import os

from ..utils.email_sendler import send_email
from ..config_data import REDIS_BROKER, REDIS_BACKEND

# REDIS_BROKER = os.getenv("REDIS_BROKER")
# REDIS_BACKEND = os.getenv("REDIS_BACKEND")

celery = Celery(
    "celery_app",
    broker=REDIS_BROKER,
    backend=REDIS_BACKEND,
)

@celery.task
def celery_send_email(
    receiver: str, subject: str, content: str, file_name_message: str
) -> None:
    send_email(receiver, subject, content, file_name_message)