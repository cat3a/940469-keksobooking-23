//TODO: Модуль для обмена данными по сети.
import {getFilter} from './filters.js';
import {showAlert} from './utils.js';
import {enableForm, sendForm, showMessage} from './form.js';
import {restoreParameters} from './map.js';

const DATA_RECEVE_ADDRESS = 'https://23.javascript.pages.academy/keksobooking/data';
const FORM_SEND_ADDRESS = 'https://23.javascript.pages.academy/keksobooking';

const createFetch = (onError = showAlert) => {
  fetch(DATA_RECEVE_ADDRESS, {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then((data) => data.json())
    .then(getFilter)
    .then(enableForm)
    .catch(onError);
};

createFetch();

sendForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const errorMessage = document.querySelector('#error');
  const successMessage = document.querySelector('#success');
  const errorMessageShow = errorMessage.cloneNode(true);
  const successMessageShow = successMessage.cloneNode(true);
  const formData = new FormData(evt.target);
  fetch(
    FORM_SEND_ADDRESS,
    {
      method: 'POST',
      body: formData,
    },
  ).then((response) => {
    if (response.ok) {
      showMessage(successMessageShow);
      restoreParameters();
    } else {
      showMessage(errorMessageShow);
    }
  }).catch(() => {
    showMessage(errorMessageShow);
  });
});
