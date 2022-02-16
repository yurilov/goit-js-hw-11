import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
const API_KEY = '25706791-83f254c628a19fe308d2a3f92';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchSearch(q, page, perPage = 40) {
  const result = await axios.get(
    `?key=${API_KEY}&per_page=${perPage}&page=${page}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`,
  );
  return result.data;
}
