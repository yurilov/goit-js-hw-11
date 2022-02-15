import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const PARAMETERS = {
  key: '25706791-83f254c628a19fe308d2a3f92',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export function fetchSearch(q) {
  return fetch(`https://pixabay.com/api/`, { ...PARAMETERS, q })
    .then(response => response.json())
    .then(post => console.log(post))
    .catch(error => console.log(error));
}
