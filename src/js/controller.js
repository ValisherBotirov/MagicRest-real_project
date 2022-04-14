const { async } = require('regenerator-runtime');

import { loadRecipe, searchResult, state } from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.loading(); //modul serverga borib kelguncha loading ishlab turadi

    await loadRecipe(id);

    const data = state.recipe;
    recipeView.render(data); //Moduldan kelgan malumotlarni view ga junatayabmiz

    // console.log(data);
    // console.log(await loadRecipe(id));
  } catch (err) {
    recipeView.renderError();
    throw err; //bu tursa ham buladi turmasa ham buladi
  }
};

// showRecipe();

const searchController = async function () {
  const inputValue = searchView.getQuery();
  await searchResult(inputValue);
  const data = state.search.results;
  resultsView.render(data);
  // console.log(data);
};

searchView.addHandlerEvent(searchController);
recipeView.addHandlerEvent(showRecipe);
