class bookView {
  #parentEl = document.querySelector('.bookmarks__list');
  #data;
  render(data) {
    this.#data = data;
    this.#parentEl.innerHTML = '';
    if (!data) return;
    this.#data.forEach(data1 => {
      this.generateHtml(data1);
    });
  }
  eventHandler(funct) {
    window.addEventListener('load', funct);
  }
  generateHtml(data) {
    const html = `<li class="preview">
    <a class="preview__link " href="#${data.id}">
      <figure class="preview__fig">
        <img src="${data.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${data.name}</h4>
        <p class="preview__publisher">${data.publisher}</p>
       
      </div>
    </a>
  </li>`;
    this.#parentEl.insertAdjacentHTML('afterbegin', html);
  }
}
export default new bookView();
