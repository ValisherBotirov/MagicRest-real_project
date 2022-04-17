import icons from '../../img/icons.svg';
class SearchValue {
  #parentElrment = document.querySelector('.results');
  #data;
  rendr(data) {
    this.#data = data;
    console.log(data);
    this.rendirHtml();
  }
  rendirHtml() {
    this.clearHtml();
    const recipe = this.#data;
    recipe.forEach(item => {
      const html = `<li class="preview">
      <a class="preview__link preview__link--active" href="#${item.id}">
        <figure class="preview__fig">
          <img src="${item.img}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${item.title}</h4>
          <p class="preview__publisher">${item.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>     
            </svg>
          </div>
        </div>
      </a>
    </li>`;
      this.#parentElrment.insertAdjacentHTML('afterbegin', html);
    });
  }
  clearHtml() {
    this.#parentElrment.innerHTML = '';
  }
  spinner() {
    const spinHtml = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    // this.clearHtml();
    this.#parentElrment.insertAdjacentHTML('afterbegin', spinHtml);
  }
}

export default new SearchValue();
