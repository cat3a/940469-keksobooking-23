//TODO: Модуль с полезными функциями, которые используются во всем проекте.

const ALERT_SHOW_TIME = 7000;

const getRandomInteger = (minNumber, maxNumber) => {
  if (minNumber >= maxNumber || minNumber < 0) {
    throw new Error('Первое число должно быть меньше второго. Оба числа должны быть неотрицательными.');
  }
  minNumber = Math.ceil(minNumber);
  maxNumber = Math.floor(maxNumber);
  const number = minNumber - 0.5 + Math.random() * (maxNumber - minNumber + 1);
  return Math.round(number);
};

const getRandomCoordinate = (minNumber, maxNumber, rounding) => {
  if (minNumber < 0 || minNumber >= maxNumber) {
    throw new Error('Все числа должны быть неотрицательными. Первое число должно быть меньше второго.');
  }
  const number = (Math.random() * (maxNumber - minNumber) + minNumber);
  return Number(number.toFixed(rounding));
};

const getShuffleElement = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getVerification = (selector, container, condition) => {
  if (condition) {
    container.querySelector(selector).classList.add('hidden');
  }
};

//TODO: С этой функцией я пока даже не знаю что делать, хоть по индексам обращайся к элементам. Но я про нее помню.

const restrictSelect = (conditions, collectionItems) => {
  Array.from(collectionItems).forEach((collectionItem) => {
    collectionItem.disabled = !conditions.includes(Number(collectionItem.value));
    collectionItem.enabled = conditions.includes(Number(collectionItem.value));
    collectionItem.selected = !(collectionItem.disabled + conditions.length - 1);
  });
};

const timeChangeHandler = (linkedItems) => (evt) => {
  linkedItems.value = evt.target.value;
};

const showAlert = (message, messagePositionValue = '0', color = 'red') => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '500';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = messagePositionValue;
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = color;

  alertContainer.textContent = 'Кажется что-то пошло не так. Попробуйте перезагрузить страницу. Если это не помогло, подождите какое-то время и перезагрузите страницу еще раз.';

  document.body.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomInteger, getRandomCoordinate, getShuffleElement, getVerification, restrictSelect, timeChangeHandler, showAlert, debounce};
