import { refs } from './getRefs';
export function behaviorScroll() {
  const { height: cardHeight } = refs.galleryRef.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
