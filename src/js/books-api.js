import axios from 'axios';

axios.defaults.baseURL = 'https://books-backend.p.goit.global/';

export async function getDataOnRequest(urlApi) {
  const response = await axios.get(urlApi);
  return response.data;
}

export async function getBooksByCategory(urlApi, params) {
  const axiosOptions = {
    params: {
      category: params,
    },
  };
  const response = await axios.get(urlApi, axiosOptions);
  return response.data;
}
