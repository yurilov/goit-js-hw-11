import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import settings from './settings';

const { BASE_URL, API_KEY } = settings;
let userQuery = '';
axios.defaults.baseURL = BASE_URL;

export async function fetchSearch(q, page, perPage = 40) {
  try {
    if (userQuery !== q) {
      userQuery = q;
      page = 1;
    }

    const response = await axios.get(
      `?key=${API_KEY}&per_page=${perPage}&page=${page}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`,
    );

    Notify.success(`Hurray, we found ${response.data.totalHits}`);

    return response.data;
  } catch (e) {
    Notify.failure('Sorry, cant find such images!');
  }
}
