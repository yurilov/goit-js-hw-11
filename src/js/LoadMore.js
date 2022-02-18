export class LoadMore {
  #btnRef;
  #className;
  #onClick;

  constructor({ selector, className = 'hidden', isHidden = false, onClick = () => null }) {
    this.#btnRef = document.querySelector(selector);
    this.#className = className;
    this.#onClick = onClick;

    this.#bindEvents();
    if (isHidden) this.hide();
  }

  show() {
    this.#btnRef.classList.remove(this.#className);
  }

  hide() {
    this.#btnRef.classList.add(this.#className);
  }

  #bindEvents() {
    this.#btnRef.addEventListener('click', this.#onClick);
  }
}
