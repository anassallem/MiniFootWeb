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

export const getAbonneesStade = (idStade) => {
    const requestURL = `${URL}/stade/${idStade}/abonnees`;
      return axios.get(requestURL).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const getImagesStade = (idStade) => {
    const requestURL = `${URL}/stade/${idStade}/photos`;
      return axios.get(requestURL).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};
