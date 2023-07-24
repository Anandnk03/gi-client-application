import axios from 'axios';

axios.interceptors.request.use(function (config) {
  //config.baseURL = 'http://localhost:6688/api';
  config.baseURL = 'http://192.168.1.122:6688/api';

  return config;
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.message === 'Network Error') {
      console.log('Network Error');
    }
    return Promise.reject(error);
  }
);

const exportedObject = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};

export default exportedObject;
