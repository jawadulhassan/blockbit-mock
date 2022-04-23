import axios from 'axios';

export const apiClient = (userToken) => {
  const apiUrl = process.env.REACT_APP_API_ENDPOINT;
  const defaultOptions = {
    timeout: 90000,
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: !!userToken && `${userToken}`,
    },
  };

  return {
    getBaseUrl: () => {
      return `${apiUrl}`;
    },
    get: (url, options = {}) => {
      if (!isCompleteUrl(url)) {
        url = `${apiUrl}${url}`;
      }
      console.log(
        'REQUESTING GET API CALL : \nURL : ',
        `${url}`,
        'OPTIONS : ',
        options
      );
      return axios.get(`${url}`, { ...defaultOptions, ...options });
    },
    post: (url, data, options = {}) => {
      if (!isCompleteUrl(url)) {
        url = `${apiUrl}${url}`;
      }
      console.log(
        'REQUESTING POST API CALL : \nURL : ',
        `${url}`,
        'DATA : ',
        data,
        'OPTIONS : ',
        options
      );
      return axios.post(`${url}`, data, { ...defaultOptions, ...options });
    },
    put: (url, data, options = {}) => {
      if (!isCompleteUrl(url)) {
        url = `${apiUrl}${url}`;
      }
      console.log(
        'REQUESTING PUT API CALL : \nURL : ',
        `${url}`,
        'DATA : ',
        data,
        'OPTIONS : ',
        options
      );
      return axios.put(`${url}`, data, { ...defaultOptions, ...options });
    },
    delete: (url, options = {}) => {
      if (!isCompleteUrl(url)) {
        url = `${apiUrl}${url}`;
      }
      console.log(
        'REQUESTING DELETE API CALL : \nURL : ',
        `${url}`,
        'OPTIONS : ',
        options
      );
      return axios.delete(`${url}`, { ...defaultOptions, ...options });
    },
  };
};

function isCompleteUrl(url = '') {
  let val = url.indexOf('https://') > -1 || url.indexOf('http://') > -1;
  return val;
}
