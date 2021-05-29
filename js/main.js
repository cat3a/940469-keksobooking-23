const getRandomInteger = function (min, max) {
  if(min <= max || min < 0 || max < 0) {
    throw new Error('Оба числа должны быть неотрицательными. Числа не могут быть равны друг другу.');
  }
  const number = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(number);
};

getRandomInteger(6, 9);
getRandomInteger(6, 90);
getRandomInteger(90, 90);
