//TODO: Это модуль генерации разметки похожих элементов.

import {getVerification} from './utils.js';

const HOME_TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const template = document.querySelector('#card').content;

const getTickets = (offer, author) => {
  const ticket = template.cloneNode(true);
  ticket.querySelector('.popup__title').textContent = offer.title;
  getVerification('.popup__title', ticket, offer.title.length < 2);
  ticket.querySelector('.popup__text--address').textContent = offer.address;
  getVerification('.popup__text--address', ticket, offer.address.length < 10);
  ticket.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  getVerification('.popup__text--price', ticket, offer.price < 1);
  ticket.querySelector('.popup__type').textContent = HOME_TYPES[offer.type];
  ticket.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  ticket.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  if (offer.features) {
    const ticketFeatureSelector = ticket.querySelector('.popup__features');
    ticketFeatureSelector.innerHTML = '';
    const ticketFeatures = offer.features;
    for (const ticketFeature of ticketFeatures) {
      const ticketFeatureElement = document.createElement('li');
      ticketFeatureElement.classList.add('popup__feature');
      ticketFeatureElement.classList.add(`popup__feature--${ticketFeature}`);
      ticketFeatureSelector.appendChild(ticketFeatureElement);
    }
    getVerification('.popup__features', ticket, offer.features.length === 0);
  }
  if(!offer.features) {
    const ticketFeatureSelector = ticket.querySelector('.popup__features');
    ticketFeatureSelector.innerHTML = '';
  }

  if (offer.description) {
    ticket.querySelector('.popup__description').textContent = offer.description;
    getVerification('.popup__description', ticket, offer.description.length < 1);
  }
  const ticketPhotosSelector = ticket.querySelector('.popup__photos');
  ticketPhotosSelector.querySelector('img').remove();
  if (offer.photos) {
    const ticketPhotos = offer.photos;
    for (const ticketPhoto of ticketPhotos) {
      const ticketPhotoElement = document.createElement('img');
      ticketPhotoElement.src = ticketPhoto;
      ticketPhotoElement.width = 45;
      ticketPhotoElement.height = 40;
      ticketPhotoElement.alt = 'Фотография жилья';
      ticketPhotoElement.classList.add('popup__photo');
      ticketPhotosSelector.appendChild(ticketPhotoElement);
    }
    getVerification('.popup__photo', ticket, offer.photos === '');
  }

  ticket.querySelector('.popup__avatar').src = author.avatar;
  getVerification('.popup__avatar', ticket, author.avatar.length === 0);
  return ticket.children[0];
};

export {getTickets};
