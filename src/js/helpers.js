import { async } from 'regenerator-runtime';
import { timiOutSec } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(timiOutSec)]);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`${response.statusText} : ${response.status}`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
