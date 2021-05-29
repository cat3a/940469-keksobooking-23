const getRandomInteger = function (minNumber, maxNumber) {
  if(minNumber >= maxNumber || minNumber < 0 || maxNumber < 0) {
    throw new Error('Первое число должно быть меньше второго. Оба числа должны быть неотрицательными.');
  }
  minNumber = Math.ceil(minNumber);
  maxNumber = Math.floor(maxNumber);
  const number = minNumber - 0.5 + Math.random() * (maxNumber - minNumber + 1);
  return Math.round(number);
};

getRandomInteger(6, 9);

const getRandomCoordinate =  function (minNumber, maxNumber, rounding) {
  if(minNumber < 0 || maxNumber < 0 || minNumber >= maxNumber) {
    throw new Error('Все числа должны быть неотрицательными. Первое число должно быть меньше второго.');
  }
  const number = (Math.random() * (maxNumber - minNumber) + minNumber);
  return Number(number.toFixed(rounding));
};

getRandomCoordinate(6.77, 9.5, 9);
