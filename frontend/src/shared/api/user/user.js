const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
//import { headers } from ''

const userAPI = {
    APIGetCSRFToken: async () => {
        const response = await fetch(`${SERVER_URL}/api/csrf_token`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        console.log(SERVER_URL);
        return response;
    },

    APISendFeedback: async (data, csrfToken) => {
        return fetch(`${SERVER_URL}/api/user/send_feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });
    },
};

export default userAPI;
