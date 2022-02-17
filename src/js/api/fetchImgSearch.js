import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import settings from './settings';

const { BASE_URL, API_KEY } = settings;

axios.defaults.baseURL = BASE_URL;

export async function fetchSearch(q, page = 1, perPage = 40) {
  const result = await axios.get(
    `?key=${API_KEY}&per_page=${perPage}&page=${page}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`,
  );
  return result.data;
}
