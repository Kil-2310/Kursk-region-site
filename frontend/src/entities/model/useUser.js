import { useCallback } from 'react';

import { userAPI } from '@/shared/api';

const useUser = () => {
    const sendFeedback = useCallback((content, email, setIsSubmitting) => {
        const formData = {
            email: email,
            content: content,
        };

        userAPI
            .APISendFeedback(formData)
            .then(() => alert('Успешно'))
            .catch(() => alert('Ошибка отправки ('))
            .finally(() => setIsSubmitting(false));
    }, []);

    return {
        sendFeedback,
    };
};

export default useUser;
