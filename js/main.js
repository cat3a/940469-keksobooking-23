const getRandomInteger = function (minNumber, maxNumber) {
  if(minNumber >= maxNumber || minNumber < 0 || maxNumber < 0) {
    throw new Error('Оба числа должны быть неотрицательными. Первое число должно быть меньше второго.');
  }
  const minNumberRounding = Math.ceil(minNumber);
  const maxNumberRounding = Math.floor(maxNumber);
  const number = minNumberRounding - 0.5 + Math.random() * (maxNumberRounding - minNumberRounding + 1);
  return Math.round(number);
};

getRandomInteger(6, 9);

const getRandomCoordinate =  function (minNumber, maxNumber, rounding) {
  if(minNumber < 0 || maxNumber < 0 || minNumber >= maxNumber || rounding < 0 || rounding > 100) {
    throw new Error('Все числа должны быть неотрицательными. Первое число должно быть меньше второго. Третье число должно находиться в диапазоне [0, 100].');
  }
  const number = (Math.random() * (maxNumber - minNumber) + minNumber);
  return Number(number.toFixed(rounding));
};

getRandomCoordinate(6.77, 9.5, 9);
