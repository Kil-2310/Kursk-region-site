# tests/test_user.py
from unittest.mock import patch, MagicMock
from app.config_data import SMTP_USER


def test_send_feedback_success(client):
    """Тест успешной отправки feedback с почтой от пользователя"""

    feedback_data = {
        "email": "user@example.com",
        "content": "Test feedback message"
    }

    # Мокаем Celery задачу по правильному пути
    # Если тест прошел с этим путем, значит он правильный
    with patch('app.celery.celery_send_email.delay') as mock_celery:
        mock_celery.return_value = MagicMock()

        response = client.post("/api/user/send_feedback", json=feedback_data)

        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        print(f"Mock called: {mock_celery.called}")
        print(f"Mock call count: {mock_celery.call_count}")
        print(f"Mock call args: {mock_celery.call_args_list}")

        assert response.status_code == 200
        assert response.json() == {"result": "true"}

        # Проверяем, что Celery была вызвана 2 раза
        assert mock_celery.call_count == 2, f"Expected 2 calls, got {mock_celery.call_count}"

        # Проверяем аргументы вызовов
        calls = mock_celery.call_args_list

        # Первый вызов (письмо пользователю)
        first_call_args = calls[0][1]  # keyword arguments
        assert first_call_args.get('receiver') == feedback_data['email']
        assert "Благодарность" in first_call_args.get('subject', '')

        # Второй вызов (письмо администратору)
        second_call_args = calls[1][1]
        assert second_call_args.get('receiver') == SMTP_USER
        assert "Новый отзыв" in second_call_args.get('subject', '')
