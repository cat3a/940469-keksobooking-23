const getRandomInteger = (minNumber, maxNumber) => {
  if (minNumber >= maxNumber || minNumber < 0) {
    throw new Error('Первое число должно быть меньше второго. Оба числа должны быть неотрицательными.');
  }
  minNumber = Math.ceil(minNumber);
  maxNumber = Math.floor(maxNumber);
  const number = minNumber - 0.5 + Math.random() * (maxNumber - minNumber + 1);
  return Math.round(number);
};

getRandomInteger(6, 9);

const getRandomCoordinate = (minNumber, maxNumber, rounding) => {
  if (minNumber < 0 || minNumber >= maxNumber) {
    throw new Error('Все числа должны быть неотрицательными. Первое число должно быть меньше второго.');
  }
  const number = (Math.random() * (maxNumber - minNumber) + minNumber);
  return Number(number.toFixed(rounding));
};

getRandomCoordinate(6.77, 9.5, 9);


const SIMILAR_OBJECT_COUNT = 10;
const AUTHOR_START_COUNT = 1;
const AUTHOR_END_COUNT = 8;
const NO_AVATAR = 'no-avatar';

const getAvatar = () => `img/avatars/user0${getRandomInteger(AUTHOR_START_COUNT, AUTHOR_END_COUNT)}.png`;

const similarAvatarObjects = [];
for (let i = AUTHOR_START_COUNT; i <= AUTHOR_END_COUNT; i++) {
  let avatar = getAvatar();
  while (similarAvatarObjects.find((elem) => elem === avatar)) {
    avatar = getAvatar();
  }
  similarAvatarObjects.push(avatar);
}
while (similarAvatarObjects.length < SIMILAR_OBJECT_COUNT) {
  similarAvatarObjects.push(NO_AVATAR);
}

const getAuthor = () => {
  const author = similarAvatarObjects[0];
  similarAvatarObjects.splice(0,1);
  return author;
};

const getObject = () =>
  ({
    author: {avatar: getAuthor()},
  });

const similarObjects = new Array(SIMILAR_OBJECT_COUNT).fill(null).map(() => getObject());

console.log(similarObjects);
