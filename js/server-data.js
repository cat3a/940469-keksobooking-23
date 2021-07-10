//TODO: Модуль для обмена данными по сети.
import {getFilter} from './test.js';
import {showAlert} from './utils.js';


const DATA_RECEVE_ADDRESS = 'https://23.javascript.pages.academy/keksobooking/data';

const createFetch = (onError) => {
  fetch(DATA_RECEVE_ADDRESS, {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then((data) => data.json())
    .then(getFilter)
    .catch(onError);
};

createFetch(showAlert);

