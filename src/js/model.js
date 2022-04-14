import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJson } from './helpers';

// qiymatlarni globalni qilib uzimizdan saqlab olamiz
export const state = {
  recipe: {},
  search: {
    query: ' ',
    data: [],
    results: {},
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJson(API_URL + id); //getJson fungsiyadidan javob kelishinin kutib turadi(fungsiyani  olib keladi)
    // console.log(data);
    const obj = data.data.recipe;
    state.recipe = {
      //tepadagi ozgaruvchimizga saqlab oldik
      id: obj.id,
      time: obj.cooking_time,
      publisher: obj.publisher,
      title: obj.title,
      servings: obj.servings,
      source_url: obj.source_url,
      ingredients: obj.ingredients,
      image: obj.image_url,
    };
  } catch (err) {
    throw err;
  }
};

export const searchResult = async function (serachKey) {
  try {
    const data = await getJson(API_URL + `?search=${serachKey}`);
    const getArr = data.data.recipes;
    console.log(getArr);
    state.search.results = getArr.map(val => {
      return {
        id: val.id,
        img: val.image_url,
        publisher: val.publisher,
        title: val.title,
      };
    });
    // console.log(data);
  } catch (err) {
    throw err;
  }
};
