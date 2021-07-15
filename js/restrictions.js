import {restrictSelect, timeChangeHandler} from './utils.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

const ROOMS = {
  'for 1 guests': {
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
  'for 100 guests': {
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

const capacitySelectItems = document.querySelector('#capacity').querySelectorAll('option');

const roomSelect = document.querySelector('#room_number');

restrictSelect(ROOMS['for 1 guests']['values'], capacitySelectItems);

const roomChangeHandler = (evt) => {
  restrictSelect(ROOMS[`for ${evt.target.value} guests`]['values'], capacitySelectItems);
};

roomSelect.addEventListener('change', roomChangeHandler);

const houseSelect = document.querySelector('#type');
priceInput.min = HOUSE_PRICES['flat'];
priceInput.placeholder = HOUSE_PRICES['flat'];

const houseChangeHandler = (evt) => {
  priceInput.min = HOUSE_PRICES[evt.target.value];
  priceInput.placeholder = HOUSE_PRICES[evt.target.value];
};

houseSelect.addEventListener('change', houseChangeHandler);

const timeInSelect = document.querySelector('#timein');
const timeOutSelect = document.querySelector('#timeout');

timeInSelect.addEventListener('change', timeChangeHandler(timeOutSelect));

timeOutSelect.addEventListener('change', timeChangeHandler(timeInSelect));

const inputListenHandler = () => {
  const price  = document.querySelector('#price').min;
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

priceInput.addEventListener('input', inputListenHandler);

export {ROOMS, capacitySelectItems, priceInput, titleInput};
