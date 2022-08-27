/* eslint-disable camelcase */
import axios from 'axios';

export const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

export const fetchToken = async () => {
  try {
    const { data } = await moviesApi.get('/authentication/token/new');
    const { request_token } = data;
    if (data.success) {
      localStorage.setItem('request_token', request_token);
      window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (e) {
    console.error(e);
  }
};

export const createSessionID = async () => {
  const token = localStorage.getItem('request_token');
  if (token) {
    try {
      const { data: { session_id } } = await moviesApi.post('authentication/session/new', {
        request_token: token,
      });
      localStorage.setItem('session_id', session_id);
    } catch (error) {
      console.error(error);
    }
  }
};
