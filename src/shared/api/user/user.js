import { ENDPOINT_URL } from '/config_data'

const userAPI = {
    APISendFeedback: async (data) => {
        return fetch(ENDPOINT_URL, {
            method: 'POST',
            body: data
        })
    }
}

export default userAPI