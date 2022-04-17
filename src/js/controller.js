import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsview from './views/resultsview.js';
import PaginationView from './views/PaginationView.js';
import bookView from './views/bookmarks';
(() => {
  document.querySelector('.search__field').focus();
})();
const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    recipeView.spinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.errorNotify();
  }
};

// console.log(data);
const update = function (num) {
  model.updateServings(num);
  recipeView.render(model.state.recipe);
};

// const data = searchView.addHandleEvent();

const cotrolSearch = async function () {
  resultsview.spinner();
  let data = searchView.getValue();
  await model.loadSearchResult(data);
  // const datasearch = model.state.search.results;
  const data1 = model.PaginationFetch();
  PaginationView.render(model.state.search);
  resultsview.rendr(data1);
};

const PaginationController = async function (page) {
  const data1 = model.PaginationFetch(page);
  PaginationView.render(model.state.search);
  resultsview.rendr(data1);
};
function constrolBook() {
  if (model.state.recipe.bookmarked) {
    model.removeBook(model.state.recipe.id);
  } else {
    model.addBook(model.state.recipe);
  }
  bookView.render(model.state.bookmark);
}

function bookViews() {
  let sana = model.getLocalStorage();
  bookView.render(model.state.bookmark);
}
// https://forkify-api.herokuapp.com/v2
recipeView.addHandleEvent(showRecipe);
recipeView.addHandleServing(update);
PaginationView.addHandleEvent(PaginationController);
searchView.addHandleEvent(cotrolSearch);
recipeView.addHandleBook(constrolBook);
bookView.eventHandler(bookViews);

///////////////////////////////////////
