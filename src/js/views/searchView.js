class SearchView {
  #parentElement = document.querySelector('.search');
  #data;
  getValue() {
    const val = document.querySelector('.search__field').value;
    return val;
  }
  addHandleEvent(data) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      data();
      document.querySelector('.search__field').value = '';
    });
  }
}
export default new SearchView();
