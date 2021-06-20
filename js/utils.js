//TODO: Модуль с полезными функциями, которые используются во всем проекте.

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

//TODO: 3 идущие далее функции, вероятно, потом станут одной, но я пока не знаю, как корректно передать условие.

const restrictSelectForOne = (collection, condition, isSelect) => {
  Array.from(collection).forEach((collectionItem) => collectionItem.setAttribute('disabled', 'disabled'));
  for (const collectionItem of collection) {
    if (collectionItem.textContent === condition) {
      collectionItem.removeAttribute('disabled');
      if (isSelect) {
        collectionItem.setAttribute('selected', 'selected');
      }
    }
  }
};

const restrictSelectForTwo = (collection, conditionOne, conditionTwo, isSelect) => {
  Array.from(collection).forEach((collectionItem) => collectionItem.setAttribute('disabled', 'disabled'));
  for (const collectionItem of collection) {
    if (collectionItem.textContent === conditionOne || collectionItem.textContent === conditionTwo) {
      collectionItem.removeAttribute('disabled');
      if (isSelect) {
        collectionItem.setAttribute('selected', 'selected');
      }
    }
  }
};

const restrictSelectForThree = (collection, conditionOne, conditionTwo, conditionThree, isSelect) => {
  Array.from(collection).forEach((collectionItem) => collectionItem.setAttribute('disabled', 'disabled'));
  for (const collectionItem of collection) {
    if (collectionItem.textContent === conditionOne || collectionItem.textContent === conditionTwo || collectionItem.textContent === conditionThree) {
      collectionItem.removeAttribute('disabled');
      if (isSelect) {
        collectionItem.setAttribute('selected', 'selected');
      }
    }
  }
};

export {getRandomInteger, getRandomCoordinate, getShuffleElement, getVerification, restrictSelectForOne, restrictSelectForTwo, restrictSelectForThree};
