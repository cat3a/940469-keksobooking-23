//TODO: Это модуль генерации разметки похожих элементов.

import {similarObjects} from './map-data.js';
import {getVerification} from './utils.js';

const HOME_TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const template = document.querySelector('#card').content;

const getTickets = () => similarObjects.map((similarObject) => {
  const ticket = template.cloneNode(true);
  ticket.querySelector('.popup__title').textContent = similarObject.offer.title;
  getVerification('.popup__title', ticket, similarObject.offer.title.length < 2);
  ticket.querySelector('.popup__text--address').textContent = similarObject.offer.address;
  getVerification('.popup__text--address', ticket, similarObject.offer.address.length < 10);
  ticket.querySelector('.popup__text--price').textContent = `${similarObject.offer.price} ₽/ночь`;
  getVerification('.popup__text--price', ticket, similarObject.offer.price < 1);
  ticket.querySelector('.popup__type').textContent = HOME_TYPES[similarObject.offer.type];
  ticket.querySelector('.popup__text--capacity').textContent = `${similarObject.offer.rooms} комнаты для ${similarObject.offer.guests} гостей`;
  ticket.querySelector('.popup__text--time').textContent = `Заезд после ${similarObject.offer.checkin}, выезд до ${similarObject.offer.checkout}`;

  const ticketFeatureSelector = ticket.querySelector('.popup__features');
  ticketFeatureSelector.innerHTML = '';
  const ticketFeatures = similarObject.offer.features;
  for (const ticketFeature of ticketFeatures) {
    const ticketFeatureElement = document.createElement('li');
    ticketFeatureElement.classList.add('popup__feature');
    ticketFeatureElement.classList.add(`popup__feature--${ticketFeature}`);
    ticketFeatureSelector.appendChild(ticketFeatureElement);
  }
  getVerification('.popup__features', ticket, similarObject.offer.features.length === 0);

  ticket.querySelector('.popup__description').textContent = similarObject.offer.description;
  getVerification('.popup__description', ticket, similarObject.offer.description.length < 1);

  const ticketPhotosSelector = ticket.querySelector('.popup__photos');
  ticketPhotosSelector.querySelector('img').remove();
  const ticketPhotos = similarObject.offer.photos;
  for (const ticketPhoto of ticketPhotos) {
    const ticketPhotoElement = document.createElement('img');
    ticketPhotoElement.src = `${ticketPhoto}`;
    ticketPhotoElement.width = 45;
    ticketPhotoElement.height = 40;
    ticketPhotoElement.alt = 'Фотография жилья';
    ticketPhotoElement.classList.add('popup__photo');
    ticketPhotosSelector.appendChild(ticketPhotoElement);
  }
  getVerification('.popup__photos', ticket, similarObject.offer.photos.length === 0);

  ticket.querySelector('.popup__avatar').src = similarObject.author.avatar;
  getVerification('.popup__avatar', ticket, similarObject.author.avatar.length === 0);
  return ticket.children[0];
});

export {getTickets};
