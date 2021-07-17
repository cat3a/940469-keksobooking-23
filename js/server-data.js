import {getFilter} from './filters.js';
import {showAlert} from './utils.js';
import {enableMapFilter, sendForm, showMessage} from './form.js';
import {restoreParameters} from './map.js';

const DATA_RECEIVE_ADDRESS = 'https://23.javascript.pages.academy/keksobooking/data';
const FORM_SEND_ADDRESS = 'https://23.javascript.pages.academy/keksobooking';

const createFetch = (onError = showAlert) => {
  fetch(DATA_RECEIVE_ADDRESS, {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then((data) => data.json())
    .then(getFilter)
    .then(enableMapFilter)
    .catch(onError);
};

createFetch();

const error = document.querySelector('#error');
const success = document.querySelector('#success');

sendForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const errorMessageShow = error.cloneNode(true);
  const successMessageShow = success.cloneNode(true);
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
