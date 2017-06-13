import axios from 'axios';
import { URL, CONFIG, CONFIGIMAGE } from './config';

export const uploadImageEvent = (photo, idStade) => {
     const requestURL = `${URL}/adverts/uploadEvent/${idStade}`;
      return axios.post(requestURL, photo, CONFIGIMAGE).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};
export const addAdvertEvenement = (advert, idStade) => {
     const requestURL = `${URL}/adverts/advertEvent/${idStade}`;
      return axios.post(requestURL, advert, CONFIG).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};
export const getListEvents = (idStade) => {
     const requestURL = `${URL}/adverts/advertEvent/${idStade}`;
      return axios.get(requestURL).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};
export const deleteEventById = (idAdvert) => {
    const requestURL = `${URL}/adverts/${idAdvert}/delete`;
    return axios.delete(requestURL).then((res) => {
      return res.data;
    }, (res) => {
      throw new Error(res);
    });
};
