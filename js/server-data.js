//TODO: Модуль для обмена данными по сети.
import {getFilter} from './test.js';
//import {showAlert} from './utils';
//import {showAlert} from './utils';
//import {showAlert} from './utils.js';

const showAlert = () => {

};

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

createFetch();
//const createFetch = (onSuccess, onError = showAlert) => {
//fetch(
//  DATA_RECEVE_ADDRESS,
// {
//   method: 'GET',
//   credentials: 'same-origin',
// },
//)
// .then((response) => {
//   if (response.ok) {
//   return response.json();
// }
//  throw new Error(`${response.status} ${response.statusText}`);
//})
//.then(onSuccess)
// .catch(onError);
//};

//export {createFetch};
