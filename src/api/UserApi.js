import axios from 'axios';
import { URL, CONFIG } from './config';

export const auth = (user) => {
    const requestURL = `${URL}/authenticate`;
      return axios.post(requestURL, user ).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const create = (user) => {
    const requestURL = `${URL}/register`;
      return axios.post(requestURL, user, CONFIG).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};
