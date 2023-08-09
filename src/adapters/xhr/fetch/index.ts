import { API_BASE_URL } from "../../../helpers/constants/TVmazeEndpoint";

export const getResource = (url: string) => {
    return fetch(`${API_BASE_URL}${url}`)
        .then((response) => response.json())
        .then((data) => {
            return {
                data: data,
            };
        });
};