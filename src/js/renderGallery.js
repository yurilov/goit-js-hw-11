import { fetchSearch } from './api/fetchImgSearch';
import { refs } from './getRefs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { LoadMore } from './LoadMore';
import galleryCard from './templates/galleryCard.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let userQuery = '';
let page = 1;

const loadMoreBtn = new LoadMore({
  selector: '#loadMore',
  className: 'is-hidden',
  isHidden: true,
  onClick() {
    loadMoreBtn.hide();
    loadPictures(userQuery);
  },
});

refs.formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const q = refs.inputRef.value.trim();
  console.log(q);
  fetchSearch(q).then(renderGallery);
  console.log('onFormSubmit - fetchSearch(q)', fetchSearch(q));
}

function renderGallery(imgArr) {
  const hits = imgArr.hits;
  const markup = galleryCard(hits);
  refs.galleryRef.innerHTML = markup;
}
