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
const similarFragment = document.createDocumentFragment();

for (let i = 0; i <= similarObjects.length-1; i++) {
  const ticket = template.cloneNode(true);
  ticket.querySelector('.popup__title').textContent = similarObjects[i].offer.title;
  if (similarObjects[i].offer.title.length < 2) {
    ticket.querySelector('.popup__title').classList.add('hidden');
  }
  ticket.querySelector('.popup__text--address').textContent = similarObjects[i].offer.address;
  if (similarObjects[i].offer.address.length < 10)  {
    ticket.querySelector('.popup__text--address').classList.add('hidden');
  }
  ticket.querySelector('.popup__text--price').textContent = `${similarObjects[i].offer.price} ₽/ночь`;
  if (similarObjects[i].offer.price < 1) {
    ticket.querySelector('.popup__text--price').classList.add('hidden');
  }
  ticket.querySelector('.popup__type').textContent = HOME_TYPES[similarObjects[i].offer.type];
  ticket.querySelector('.popup__text--capacity').textContent = `${similarObjects[i].offer.rooms} комнаты для ${similarObjects[i].offer.guests} гостей`;
  ticket.querySelector('.popup__text--time').textContent = `Заезд после ${similarObjects[i].offer.checkin}, выезд до ${similarObjects[i].offer.checkout}`;

  const ticketFeatureSelector = ticket.querySelector('.popup__features');
  ticketFeatureSelector.innerHTML = '';
  const ticketFeatures = similarObjects[i].offer.features;
  for (const ticketFeature of ticketFeatures) {
    const ticketFeatureElement = document.createElement('li');
    ticketFeatureElement.classList.add('popup__feature');
    ticketFeatureElement.classList.add(`popup__feature--${ticketFeature}`);
    ticketFeatureSelector.appendChild(ticketFeatureElement);
  }
  if (similarObjects[i].offer.features.length === 0) {
    ticket.querySelector('.popup__features').classList.add('hidden');
  }

  ticket.querySelector('.popup__description').textContent = similarObjects[i].offer.description;
  if (similarObjects[i].offer.description.length < 1) {
    ticket.querySelector('.popup__description').classList.add('hidden');
  }

  const ticketPhotosSelector = ticket.querySelector('.popup__photos');
  ticketPhotosSelector.querySelector('img').remove();
  const ticketPhotos = similarObjects[i].offer.photos;
  for (const ticketPhoto of ticketPhotos) {
    const ticketPhotoElement = document.createElement('img');
    ticketPhotoElement.src = `${ticketPhoto}`;
    ticketPhotoElement.width = 45;
    ticketPhotoElement.height = 40;
    ticketPhotoElement.alt = 'Фотография жилья';
    ticketPhotosSelector.appendChild(ticketPhotoElement);
  }
  if (similarObjects[i].offer.photos.length === 0) {
    ticket.querySelector('.popup__photos').classList.add('hidden');
  }

  ticket.querySelector('.popup__avatar').src = similarObjects[i].author.avatar;
  if (similarObjects[i].author.avatar.length === 0) {
    ticket.querySelector('.popup__avatar').classList.add('hidden');
  }

  similarFragment.appendChild(ticket);
  if (i === 0) {
    templateDraw.appendChild(similarFragment);
  }
}
