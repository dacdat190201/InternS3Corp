import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dummyjson.com/',
    timeout: 1500,
});

export default instance;
