import { useCallback, useState } from 'react';
import { userAPI } from '@/shared/api';

const useUser = () => {
    const [csrfTokenGlobal, setCsrfTokenGlobal] = useState(null);

    const CSRFToken = useCallback(async () => {
        try {
            const response = await userAPI.APIGetCSRFToken();
            const data = await response.json();
            setCsrfTokenGlobal(data.csrf_token);
            console.log('Токен сохранён:', data.csrf_token);
            return data.csrf_token;
        } catch (error) {
            console.log('Ошибка получения токена', error);
            return null;
        }
    }, []);

    const sendFeedback = useCallback(
        async (content, email, setIsSubmitting) => {
            // Получаем токен, если его нет
            let token = csrfTokenGlobal;
            if (!token) {
                token = await CSRFToken();
                if (!token) {
                    alert('Ошибка безопасности. Обновите страницу.');
                    setIsSubmitting(false);
                    return;
                }
            }

            const formData = { email, content };

            try {
                const response = await userAPI.APISendFeedback(formData, token);
                if (response.ok) {
                    alert('Успешно');
                } else {
                    const error = await response.json();
                    throw new Error(error.detail || 'Ошибка отправки');
                }
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Ошибка отправки');
            } finally {
                setIsSubmitting(false);
            }
        },
        [csrfTokenGlobal, CSRFToken]
    );

    return { sendFeedback, CSRFToken };
};

export default useUser;
