import { fetchSearch } from './api/fetchImgSearch';
import { refs } from './getRefs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

refs.formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const q = refs.inputRef.value.trim();
  console.log(q);
  fetchSearch(q).then(renderGallery);
}

function renderGallery(imgArr) {
  console.log(imgArr);
}
