import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://udemy-burger-d7ae7.firebaseio.com/'
});

export default instance;