import smtplib
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

from ..config_data import SMTP_HOST, SMTP_PORT, SMTP_PASSWORD, SMTP_USER

logger = logging.getLogger(__name__)


def send_email(
        receiver: str, subject: str, content: str, file_name_message: str
) -> None:
    """Отправляет HTML-письмо через SMTP с использованием шаблона."""

    try:
        logger.info(f"Attempting to send email to {receiver}")

        # Убираем всю обёртку с socket, используем стандартное подключение
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=30) as server:
            logger.info("Connected to SMTP server")
            server.login(SMTP_USER, SMTP_PASSWORD)
            logger.info("Logged in")

            email = MIMEMultipart()
            email["Subject"] = subject
            email["From"] = SMTP_USER
            email["To"] = receiver

            path_for_template = (
                    Path(__file__).parent.parent / "email_forms" / file_name_message
            )

            with open(path_for_template, mode="r", encoding="utf-8") as f:
                html_message = f.read()

                if file_name_message == "message_for_me.html":
                    message = html_message.format(content)
                else:
                    message = html_message

                email.attach(MIMEText(message, "html", "utf-8"))

            server.sendmail(SMTP_USER, receiver, email.as_string())
            logger.info(f"Email sent successfully to {receiver}")

    except Exception as e:
        logger.error(f"Failed to send email to {receiver}: {e}", exc_info=True)
        raise
