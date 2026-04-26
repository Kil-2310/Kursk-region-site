import { headers } from '@/shared/api/apiClient.js';
import { SERVER_URL } from '/config_data';

const userAPI = {
    APISendFeedback: async (data) => {
        return fetch(`${SERVER_URL}/api/user/send_feedback`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });
    },
};

export default userAPI;
