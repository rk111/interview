import axios from 'axios';

let baseURL = 'https://62ea43b73a5f1572e877b324.mockapi.io/api/v1/employee';

export const Get = (url) => {
    return axios.get(baseURL + url);
}

export const Post = (url, reqContent) => {
    return axios.post(baseURL + url, reqContent);
}

export const Put = (url, reqContent) => {
    return axios.put(baseURL + url, reqContent);
}