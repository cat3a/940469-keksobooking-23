//TODO: Это модуль генерации разметки похожих элементов.

import {similarObjects} from './map-data.js';

const HOME_TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const template = document.querySelector('#card').content;
const templateDraw = document.querySelector('#map-canvas');

const ticket = template.cloneNode(true);
ticket.querySelector('.popup__title').textContent = similarObjects[0].offer.title;
ticket.querySelector('.popup__text--address').textContent = similarObjects[0].offer.address;
ticket.querySelector('.popup__text--price').textContent = `${similarObjects[0].offer.price} ₽/ночь`;
ticket.querySelector('.popup__type').textContent = HOME_TYPES[similarObjects[0].offer.type];
ticket.querySelector('.popup__text--capacity').textContent = `${similarObjects[0].offer.rooms} комнаты для ${similarObjects[0].offer.guests} гостей`;
ticket.querySelector('.popup__text--time').textContent = `Заезд после ${similarObjects[0].offer.checkin}, выезд до ${similarObjects[0].offer.checkout}`;

const ticketFeatureSelector = ticket.querySelector('.popup__features');
ticketFeatureSelector.innerHTML = '';
const ticketFeatures = similarObjects[0].offer.features;
for (const ticketFeature of ticketFeatures) {
  const ticketFeatureElement = document.createElement('li');
  ticketFeatureElement.classList.add('popup__feature');
  ticketFeatureElement.classList.add(`popup__feature--${ticketFeature}`);
  ticketFeatureSelector.appendChild(ticketFeatureElement);
}

ticket.querySelector('.popup__description').textContent = similarObjects[0].offer.description;

const ticketPhotosSelector = ticket.querySelector('.popup__photos');
ticketPhotosSelector.querySelector('img').remove();
const ticketPhotos = similarObjects[0].offer.photos;
for (const ticketPhoto of ticketPhotos) {
  const ticketPhotoElement = document.createElement('img');
  ticketPhotoElement.src = `${ticketPhoto}`;
  ticketPhotoElement.width = 45;
  ticketPhotoElement.height = 40;
  ticketPhotoElement.alt = 'Фотография жилья';
  ticketPhotosSelector.appendChild(ticketPhotoElement);
}

ticket.querySelector('.popup__avatar').src = similarObjects[0].author.avatar;

templateDraw.appendChild(ticket);
