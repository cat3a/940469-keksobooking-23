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

//homework 2
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
  similarAvatarObjects.splice(0, 1);
  return author;
};

const stickerStarts = ['Сдам в аренду', 'Продам', 'Куплю', 'Сниму'];
const stickerEnds = ['квартиру', 'комнату', 'дворец', 'гараж'];

const startCoordinate = 10;
const endCoordinate = 20;
const coordinateRounding = 10;

const startPrice = 1000;
const endPrice = 1000000;

const houseTypes = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const startRoom = 1;
const endRoom = 25;

const startGuests = 1;
const endGuests = 20;

const chickensAndCheckouts = ['12:00', '13:00', '14:00'];

const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const getFeatureItem = () => features[getRandomInteger(0, features.length - 1)];
const getFeatures = () => {
  const feature = getRandomInteger(1, features.length);
  const featuresObjects = [];
  for (let i = 0; i < feature; i++) {
    let featureItem = getFeatureItem();
    while (featuresObjects.find((elem) => elem === featureItem)) {
      featureItem = getFeatureItem();
    }
    featuresObjects.push(featureItem);
  }
  return featuresObjects;
};

const descriptions = ['Современный интерьер, отличный дизайн.', 'Просто и по-домашнему. Здесь будет очень уютно.',
  'Роскошный готический интерьер. Кажется, здесь мог бы поселиться сам Дракула.', 'Интерьер в стиле минимализма. Ничего лишнего.'];
const descriptionAdditions = ['Возможно проживание с животными.', 'Все готово, можно заезжать и жить.', 'Есть место, для размещения собственной мебели.'];

const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const collectionStart = 1;
const collectionEnd = 10;
const getPhotos = () => new Array(getRandomInteger(collectionStart, collectionEnd)).fill(null).map(() => photos[getRandomInteger(0, photos.length - 1)]);

const START_LONGITUDE = 139.70000;
const END_LONGITUDE = 139.80000;
const START_LATITUDE = 35.65000;
const END_LATITUDE = 35.70000;
const COORDINATE_ROUNDING = 5;

const getObject = () =>
  ({
    author: {avatar: getAuthor()},
    offer: {
      title: `${stickerStarts[getRandomInteger(0, stickerStarts.length - 1)]} ${stickerEnds[getRandomInteger(0, stickerEnds.length - 1)]}`,
      address: `${getRandomCoordinate(startCoordinate, endCoordinate, coordinateRounding)}, ${getRandomCoordinate(startCoordinate, endCoordinate, coordinateRounding)}`,
      price: getRandomInteger(startPrice, endPrice),
      type: `${houseTypes[getRandomInteger(0, houseTypes.length - 1)]}`,
      rooms: getRandomInteger(startRoom, endRoom),
      guests: getRandomInteger(startGuests, endGuests),
      checkin: `${chickensAndCheckouts[getRandomInteger(0, chickensAndCheckouts.length - 1)]}`,
      checkout: `${chickensAndCheckouts[getRandomInteger(0, chickensAndCheckouts.length - 1)]}`,
      features: getFeatures(),
      description: `${descriptions[getRandomInteger(0, descriptions.length - 1)]} ${descriptionAdditions[getRandomInteger(0, descriptionAdditions.length - 1)]}`,
      photos: getPhotos(),
    },
    location: {
      lat: getRandomCoordinate(START_LATITUDE, END_LATITUDE, COORDINATE_ROUNDING),
      lng: getRandomCoordinate(START_LONGITUDE, END_LONGITUDE, COORDINATE_ROUNDING),
    },
  });

const similarObjects = new Array(SIMILAR_OBJECT_COUNT).fill(null).map(() => getObject());

console.log(similarObjects);
