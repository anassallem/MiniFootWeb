import axios from 'axios';
import { URL, CONFIG, CONFIGIMAGE } from './config';

export const updateStade = (idStade, stade) => {
//  console.log(stade);
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
// get notification match reservation
export const getEventReservation = (idStade) => {
    const requestURL = `${URL}/match/${idStade}/reserver`;
      return axios.get(requestURL).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const annulerReservation = (idMatch) => {
    const requestURL = `${URL}/match/${idMatch}`;
      return axios.delete(requestURL).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const acceptReservation = (idMatch, event) => {
    const requestURL = `${URL}/match/${idMatch}/reservation`;
      return axios.put(requestURL, event, CONFIG).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};
