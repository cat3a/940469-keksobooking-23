//TODO: Здесь будет реализована работа с ограничениями для полей ввода.

import {restrictSelect} from './utils.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE_VALUE = 1;
const MAX_PRICE_VALUE = 1000000;
const ROOMS_VALUES = {
  'for 1 guest': [1],
  'for 2 guests': [1, 2],
  'for 3 guests': [1, 2, 3],
  'not for guests': [0],
};
const ROOMS_CHECKS = {
  'for 1 guest': '1',
  'for 2 guests': '2',
  'for 3 guests': '3',
  'not for guests': '100',
};

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

const capacitySelect = document.querySelector('#capacity');

restrictSelect(ROOMS_VALUES['for 1 guest'], capacitySelect);

const roomFilterChangeHandler = (evt) => {
  if (evt.target.value === ROOMS_CHECKS['for 1 guest']) {
    restrictSelect(ROOMS_VALUES['for 1 guest'], capacitySelect);
  } else if (evt.target.value === ROOMS_CHECKS['for 2 guests']) {
    restrictSelect(ROOMS_VALUES['for 2 guests'], capacitySelect);
  } else if (evt.target.value === ROOMS_CHECKS['for 3 guests']) {
    restrictSelect(ROOMS_VALUES['for 3 guests'], capacitySelect);
  } else if (evt.target.value === ROOMS_CHECKS['not for guests']) {
    restrictSelect(ROOMS_VALUES['not for guests'], capacitySelect);
  }
};

addEventListener('change', roomFilterChangeHandler);
