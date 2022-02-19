import { fetchSearch } from './api/fetchImgSearch';
import { refs } from './getRefs';
import { behaviorScroll } from './behaviorScroll';
import { preventDefault } from './preventDefault';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { LoadMore } from './LoadMore';
import galleryCard from './templates/galleryCard.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let userQuery = '';
const perPage = 40;
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
  const q = e.currentTarget.elements.searchQuery.value.trim();
  console.log(q);
  if (userQuery !== q) {
    userQuery = q;
    page = 1;
    if (userQuery === '') {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    refs.galleryRef.innerHTML = '';
    loadMoreBtn.hide();
    if (q) {
      loadPictures(q);
    }
  }
}

function renderGallery(hits) {
  const markup = galleryCard(hits);
  refs.galleryRef.insertAdjacentHTML('beforeend', markup);
}

async function loadPictures(q) {
  const dataFromAPI = await fetchSearch(q, page, perPage);
  const response = await notificationHandler(dataFromAPI);
  renderGallery(response.hits);

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.on('show.simplelightbox', () => {
    lightbox.options.captionDelay = '250';
  });

  if (page !== 2) {
    behaviorScroll();
  }

  lightbox.refresh();
  loadMoreBtn.show();

  if (!response.hasNextPage) {
    loadMoreBtn.hide();
  }
}

function notificationHandler(data) {
  if (data.hits.length === 0) {
    Notify.failure('Sorry, cant find such images!');
  }
  if (page === 1 && data.hits.length !== 0) {
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }
  const totalPages = data.totalHits / perPage;
  const hasNextPage = page <= totalPages;
  page += 1;
  if (!hasNextPage && data.hits.length !== 0) {
    Notify.warning("Congrats, you've reached the end of search results.");
  }
  return {
    ['hits']: data.hits,
    hasNextPage,
  };
}

refs.galleryRef.addEventListener('click', preventDefault);
