import icons from '../../img/icons.svg';
class ResultView {
  #parentElement = document.querySelector('.results');
  #data;

  render(data) {
    this.#data = data;
    // console.log(data);
    this.#parentElement.innerHtml = '';
    this.#data.map(val => {
      this.#genereteHtml(val);
    });
  }
  #genereteHtml(obj) {
    const html = `
    <li class="preview">
    <a class="preview__link preview__link--active" href="#${obj.id}">
      <figure class="preview__fig">
        <img src="${obj.img}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${obj.title}</h4>
        <p class="preview__publisher">${obj.publisher}</p>
        <div class="preview__user-generated">
          <svg>
            <use href="${icons}.svg#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>  `;
    this.#parentElement.insertAdjacentHTML('afterbegin', html);
  }
}

export default new ResultView();
