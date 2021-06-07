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

//TODO: homework 2
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

const STICKER_STARTS = ['Сдам в аренду', 'Продам', 'Куплю', 'Сниму'];
const STICKER_ENDS = ['квартиру', 'комнату', 'дворец', 'гараж'];

const START_COORDINATE = 10;
const END_COORDINATE = 20;
const COORDINATE_ROUNDING_ADDRESS = 10;

const START_PRICE = 1000;
const END_PRICE = 1000000;

const HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const START_ROOM = 1;
const END_ROOM = 25;

const START_GUEST = 1;
const END_GUEST = 20;

const CHECKINS_AND_CHECKOUTS = ['12:00', '13:00', '14:00'];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const getFeatureItem = () => FEATURES[getRandomInteger(0, FEATURES.length - 1)];
const getFeatures = () => {
  const feature = getRandomInteger(1, FEATURES.length);
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

const DESCRIPTIONS = ['Современный интерьер, отличный дизайн.', 'Просто и по-домашнему. Здесь будет очень уютно.',
  'Роскошный готический интерьер. Кажется, здесь мог бы поселиться сам Дракула.', 'Интерьер в стиле минимализма. Ничего лишнего.'];
const DESCRIPTION_ADDITIONS = ['Возможно проживание с животными.', 'Все готово, можно заезжать и жить.', 'Есть место, для размещения собственной мебели.'];

const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const COLLECTION_START = 1;
const COLLECTION_END = 10;
const getPhotos = () => new Array(getRandomInteger(COLLECTION_START, COLLECTION_END)).fill(null).map(() => PHOTOS[getRandomInteger(0, PHOTOS.length - 1)]);

const START_LONGITUDE = 139.70000;
const END_LONGITUDE = 139.80000;
const START_LATITUDE = 35.65000;
const END_LATITUDE = 35.70000;
const COORDINATE_ROUNDING = 5;

const getObject = () =>
  ({
    author: {avatar: getAuthor()},
    offer: {
      title: `${STICKER_STARTS[getRandomInteger(0, STICKER_STARTS.length - 1)]} ${STICKER_ENDS[getRandomInteger(0, STICKER_ENDS.length - 1)]}`,
      address: `${getRandomCoordinate(START_COORDINATE, END_COORDINATE, COORDINATE_ROUNDING_ADDRESS)}, ${getRandomCoordinate(START_COORDINATE, END_COORDINATE, COORDINATE_ROUNDING_ADDRESS)}`,
      price: getRandomInteger(START_PRICE, END_PRICE),
      type: `${HOUSE_TYPES[getRandomInteger(0, HOUSE_TYPES.length - 1)]}`,
      rooms: getRandomInteger(START_ROOM, END_ROOM),
      guests: getRandomInteger(START_GUEST, END_GUEST),
      checkin: `${CHECKINS_AND_CHECKOUTS[getRandomInteger(0, CHECKINS_AND_CHECKOUTS.length - 1)]}`,
      checkout: `${CHECKINS_AND_CHECKOUTS[getRandomInteger(0, CHECKINS_AND_CHECKOUTS.length - 1)]}`,
      features: getFeatures(),
      description: `${DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)]} ${DESCRIPTION_ADDITIONS[getRandomInteger(0, DESCRIPTION_ADDITIONS.length - 1)]}`,
      photos: getPhotos(),
    },
    location: {
      lat: getRandomCoordinate(START_LATITUDE, END_LATITUDE, COORDINATE_ROUNDING),
      lng: getRandomCoordinate(START_LONGITUDE, END_LONGITUDE, COORDINATE_ROUNDING),
    },
  });

const similarObjects = new Array(SIMILAR_OBJECT_COUNT).fill(null).map(() => getObject());

similarObjects;
