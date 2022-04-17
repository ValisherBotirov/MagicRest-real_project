import { async } from 'regenerator-runtime';
import { API_URL, STEP } from './config';
import { getJSON } from './helper';
export const state = {
  recipe: {},
  search: {
    results: {},
    page: 1,
    step: STEP,
  },
  bookmark: [],
};
export const loadRecipe = async function (id) {
  try {
    const jSON = await getJSON(API_URL + id);
    const obj = jSON.data.recipe;
    state.recipe = {
      id: obj.id,
      name: obj.title,
      time: obj.cooking_time,
      image: obj.image_url,
      publisher: obj.publisher,
      servings: obj.servings,
      url: obj.source_url,
      ingredients: obj.ingredients,
    };
    if (state.bookmark.some(val => val.id === state.recipe.id)) {
      state.recipe.bookmarked = true;
    }
  } catch (err) {
    throw err;
  }
};
export const loadSearchResult = async function (food) {
  try {
    const data = await getJSON(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${food}`
    );
    // console.log(data);
    state.search.results = data.data.recipes.map(item => {
      return {
        img: item.image_url,
        title: item.title,
        id: item.id,
        publisher: item.publisher,
      };
    });
  } catch (err) {
    console.log(err);
  }
};
const setLocalstorage = function () {
  localStorage.setItem('book', JSON.stringify(state.bookmark));
};
export const getLocalStorage = function () {
  const arr = JSON.parse(localStorage.getItem('book'));
  if (!arr) return;
  state.bookmark = arr;
  return arr;
};
export const PaginationFetch = function (page = state.search.page) {
  const start = (page - 1) * state.search.step;

  const end = page * state.search.step;
  console.log(start);
  return state.search.results.slice(start, end);
};
export const updateServings = function (peopleNum = state.recipe.servings) {
  state.recipe.ingredients.map(val => {
    val.quantity = (val.quantity * peopleNum) / state.recipe.servings;
  });
  state.recipe.servings = peopleNum;
};
export const addBook = function (recipe) {
  state.bookmark.push(recipe);
  state.recipe.bookmarked = true;
  setLocalstorage();
};

export const removeBook = function (id) {
  const index = state.bookmark.findIndex(val => val.id == id);
  state.recipe.bookmarked = false;
  state.bookmark.splice(index, 1);
  setLocalstorage();
};
