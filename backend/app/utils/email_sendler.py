import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

from ..config_data import SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER


def send_email(
    receiver: str, subject: str, content: str, file_name_message: str
) -> None:
    """Отправляет HTML-письмо через SMTP с использованием шаблона."""

    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=30) as server:
        server.login(SMTP_USER, SMTP_PASSWORD)

        email = MIMEMultipart()
        email["Subject"] = subject
        email["From"] = SMTP_USER
        email["To"] = receiver

        path_for_template = (
            Path(__file__).parent.parent / "email_forms" / file_name_message
        )

        with open(path_for_template, mode="r", encoding="utf-8") as f:
            html_message = f.read()

            if content is None:
                message = html_message
            else:
                message = html_message.format(content)

            email.attach(MIMEText(message, "html", "utf-8"))

        server.sendmail(SMTP_USER, receiver, email.as_string())
