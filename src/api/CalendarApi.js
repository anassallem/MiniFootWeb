import axios from 'axios';
import { URL, CONFIG, CONFIGIMAGE } from './config';

export const getTeams = (text) => {
    const requestURL = `${URL}/equipe?name=${text}`;
    return axios.get(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};

export const createEvent = (event) => {
    const requestURL = `${URL}/match`;
      return axios.post(requestURL, event, CONFIG).then((res) => {
        return res.data;
    }, (res) => {
      throw new Error(res);
    });
};

export const getAllEvents = (idStade, date) => {
    const requestURL = `${URL}/match/${idStade}?date=${date}`;
    return axios.get(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};

export const deleteEvent = (idMatch) => {
    const requestURL = `${URL}/match/${idMatch}`;
    return axios.delete(requestURL)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};

export const updateEvent = (idMatch, event) => {
  console.log(idMatch);
  console.log(event);
    const requestURL = `${URL}/match/${idMatch}`;
    return axios.put(requestURL, event, CONFIG)
    .then((res) => {
      return res.data;
  }, (res) => {
    throw new Error(res);
  });
};
