import axios from 'axios';
import { URL, CONFIG, CONFIGIMAGE } from './config';

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

export const updateUser = (idUser, user) => {
    const requestURL = `${URL}/users/${idUser}`;
      return axios.put(requestURL, user, CONFIG).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};
export const uploadImageUser = (idUser, photo) => {
     const requestURL = `${URL}/users/upload/${idUser}`;
      return axios.put(requestURL, photo, CONFIGIMAGE).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};
