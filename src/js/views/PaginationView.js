import icons from '../../img/icons.svg';
class PaginationView {
  #data;
  #parentElement = document.querySelector('.pagination');
  render(data) {
    this.#data = data;
    this.#generateHTML();
  }
  #generateHTML() {
    this.#parentElement.innerHTML = '';
    const currentPage = this.#data.page;
    const Pages = Math.ceil(this.#data.results.length / this.#data.step);
    console.log(currentPage, Pages);

    const nextBtn = `
<button class="btn--inline pagination__btn--next" id=${currentPage + 1}>
  <span>Page ${currentPage + 1}</span>
  <svg class="search__icon">
    <use href="${icons}#icon-arrow-right"></use>
  </svg>
</button>`;
    const prevBtn = `<button class="btn--inline pagination__btn--prev" id=${
      currentPage - 1
    }>
<svg class="search__icon">
  <use href="${icons}#icon-arrow-left"></use>
</svg>
<span>Page ${currentPage - 1}</span>
</button>`;
    if (currentPage > 1) {
      this.#parentElement.insertAdjacentHTML('afterbegin', prevBtn);
    }
    if (Pages > currentPage) {
      this.#parentElement.insertAdjacentHTML('afterbegin', nextBtn);
    }
  }
  addHandleEvent(hundle) {
    this.#parentElement.addEventListener('click', function (evt) {
      if (evt.target.closest('.btn--inline')) {
        const g = evt.target.closest('.btn--inline').getAttribute('id') - 0;
        hundle(g);
      }
    });
  }
}
export default new PaginationView();
