//TODO: Модуль для обмена данными по сети.

import {showAlert} from './utils.js';

const DATA_RECEVE_ADDRESS = 'https://23.javascript.pages.academy/keksobooking/data';

const createFetch = (onSuccess, onError = showAlert) => () => fetch(
  DATA_RECEVE_ADDRESS,
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((json) => {
    onSuccess(json);
  })
  .catch((error) => {
    onError(error);
  });

export {createFetch};
