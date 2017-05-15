import axios from 'axios';
import { URL, CONFIG, CONFIGIMAGE } from './config';

export const updateStade = (idStade, stade) => {
    const requestURL = `${URL}/stade/${idStade}`;
      return axios.put(requestURL, stade, CONFIG).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};
