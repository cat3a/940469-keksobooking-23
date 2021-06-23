//TODO: Здесь будет реализована работа с ограничениями для полей ввода.

import {restrictSelect, timeChangeHandler} from './utils.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

const ROOMS = {
  'for 1 guest': {
    values: [1],
    checked: '1',
  },
  'for 2 guests': {
    values: [1, 2],
    checked: '2',
  },
  'for 3 guests': {
    values: [1, 2, 3],
    checked: '3',
  },
  'not for guests': {
    values: [0],
    checked: '100',
  },
};

const HOUSE_PRICES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
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

const getPriceValue = () => document.querySelector('#price').min;

const capacitySelect = document.querySelector('#capacity');

restrictSelect(ROOMS['for 1 guest']['values'], capacitySelect);

const roomChangeHandler = (evt) => {
  if (evt.target.value === ROOMS['for 1 guest']['checked']) {
    restrictSelect(ROOMS['for 1 guest']['values'], capacitySelect);
  } else if (evt.target.value === ROOMS['for 2 guests']['checked']) {
    restrictSelect(ROOMS['for 2 guests']['values'], capacitySelect);
  } else if (evt.target.value === ROOMS['for 3 guests']['checked']) {
    restrictSelect(ROOMS['for 3 guests']['values'], capacitySelect);
  } else if (evt.target.value === ROOMS['not for guests']['checked']) {
    restrictSelect(ROOMS['not for guests']['values'], capacitySelect);
  }
};

addEventListener('change', roomChangeHandler);

const houseTypes = document.querySelector('#type').children;
priceInput.min = HOUSE_PRICES['flat'];
priceInput.placeholder = HOUSE_PRICES['flat'];

const houseChangeHandler = (evt) => {
  const keys = Object.keys(HOUSE_PRICES);
  for (let i = 0; i <= houseTypes.length; i++) {
    if (evt.target.value === keys[i]) {
      const values = Object.values(HOUSE_PRICES);
      priceInput.min = values[i];
      priceInput.placeholder = values[i];
      getPriceValue();
    }
  }
};

addEventListener('change', houseChangeHandler);

const timeIns = document.querySelector('#timein').children;
const timeOuts = document.querySelector('#timeout').children;

addEventListener('change', timeChangeHandler(timeIns, timeOuts), false);

addEventListener('change', timeChangeHandler(timeOuts, timeIns), false);

const  inputListenHandler = (getPriceItem) => () => {
  const price = getPriceItem();
  if (priceInput.value < Number(price)) {
    priceInput.setCustomValidity(`Цена может быть только числом больше ${price}.`);
    priceInput.style.backgroundColor = '#ffdee6';
  } else if (priceInput.value >= MAX_PRICE_VALUE) {
    priceInput.setCustomValidity('Цена  не может быть больше 1000000.');
    priceInput.style.backgroundColor = '#ffdee6';
  } else {
    priceInput.setCustomValidity('');
    priceInput.style.backgroundColor = 'white';
  }
  priceInput.reportValidity();
};

priceInput.addEventListener('input', inputListenHandler(getPriceValue), false);
