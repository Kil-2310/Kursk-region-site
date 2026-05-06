from celery import Celery

from ..config_data import REDIS_BACKEND, REDIS_BROKER
from ..utils.email_sendler import send_email

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
