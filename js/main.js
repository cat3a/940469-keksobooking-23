import './comparison.js';
import './form-data.js';
import './generation-data.js';
import {similarObjects} from './map-data.js';
import './mark.js';
import './restrictions.js';
import './server-data.js';

similarObjects;

//TODO: Здесь пока происходит инициализация карты. Не знаю, нужно ли ее убрать в модуль карты или можно оставить прямо здесь.

const ticketForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const ticketFormChildren = ticketForm.querySelectorAll('fieldset');
const filterFormChildren = filterForm.children;

const disableMap = () => {
  ticketForm.classList.add('ad-form--disabled');
  ticketFormChildren.forEach((fieldset) => fieldset.setAttribute('disabled', 'disabled'));
  filterForm.classList.add('ad-form--disabled');
  Array.from(filterFormChildren).forEach((fieldset) => fieldset.setAttribute('disabled', 'disabled'));
};

disableMap();

const enableMap = () => {
  ticketForm.classList.remove('ad-form--disabled');
  ticketFormChildren.forEach((fieldset) => fieldset.removeAttribute('disabled'));
  filterForm.classList.remove('ad-form--disabled');
  Array.from(filterFormChildren).forEach((fieldset) => fieldset.removeAttribute('disabled'));
};

//TODO: Я пока не знаю когда и как должна сработать инициализация карты, поэтому пусть будет пока так:

document.addEventListener('click', enableMap);
