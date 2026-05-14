import { useCallback } from 'react';
import { userAPI } from '@/shared/api';

const useUser = () => {
    const sendFeedback = useCallback((data) => {

        userAPI.APISendFeedback(data)
            .catch(() => alert('Ошибка отправки'))
    }, [])

    return sendFeedback
};

export default useUser;
