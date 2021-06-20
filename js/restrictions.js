//TODO: Здесь будет реализована работа с ограничениями для полей ввода.

import {restrictSelectForOne, restrictSelectForTwo, restrictSelectForThree} from './utils.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const MIN_PRICE_VALUE = 1;
const MAX_PRICE_VALUE = 1000000;

const titleInput = document.querySelector('#title');

titleInput.addEventListener('input', () => {
  const valueTitleLength = titleInput.value.length;

  if (valueTitleLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Нужно ещё ${MIN_TITLE_LENGTH - valueTitleLength} символов. Заголовок объявления не должен быть короче, чем 30 символов.`);
    titleInput.style.backgroundColor = '#ffdee6';
  } else if (valueTitleLength >= MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Заголовок объявления не должен быть длиннее, чем 100 символов.');
  } else {
    titleInput.setCustomValidity('');
    titleInput.style.backgroundColor = 'white';
  }

  titleInput.reportValidity();
});

const priceInput = document.querySelector('#price');

priceInput.addEventListener('input', () => {
  if (priceInput.value < MIN_PRICE_VALUE) {
    priceInput.setCustomValidity('Цена может быть только числом больше 0.');
    priceInput.style.backgroundColor = '#ffdee6';
  } else if (priceInput.value >= MAX_PRICE_VALUE) {
    priceInput.setCustomValidity('Цена  не может быть больше 1000000.');
    priceInput.style.backgroundColor = '#ffdee6';
  } else {
    priceInput.setCustomValidity('');
    priceInput.style.backgroundColor = 'white';
  }

  priceInput.reportValidity();
});

const roomInput = document.querySelector('#room_number');
const capacityInputItems = document.querySelector('#capacity').children;

restrictSelectForOne(capacityInputItems,'для 1 гостя',true);

const getRoom = (evt) => {
  if (evt.target.value === '1') {
    restrictSelectForOne(capacityInputItems, 'для 1 гостя', true);
  } else if (evt.target.value === '2') {
    restrictSelectForTwo(capacityInputItems,'для 1 гостя','для 2 гостей',false);
  } else if (evt.target.value === '3') {
    restrictSelectForThree(capacityInputItems, 'для 1 гостя', 'для 2 гостей', 'для 3 гостей', false);
  } else if (evt.target.value === '100') {
    restrictSelectForOne(capacityInputItems, 'не для гостей', true);
  }
};

roomInput.addEventListener('change', getRoom);
