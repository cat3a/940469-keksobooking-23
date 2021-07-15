import {restoreParameters} from './map.js';

const ESCAPE_CODE = 27;

const ticketForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const ticketFormChildren = ticketForm.querySelectorAll('fieldset');
const filterFormChildren = filterForm.children;

const enableForm = (selector = 'ad-form--disabled', isDisabled = false) => {
  ticketForm.classList.toggle(selector, isDisabled);
  ticketFormChildren.forEach((fieldset) => fieldset.disabled = isDisabled);
};

const enableMapFilter = (selector = 'ad-form--disabled', isDisabled = false) => {
  filterForm.classList.toggle(selector, isDisabled);
  Array.from(filterFormChildren).forEach((fieldset) => fieldset.disabled = isDisabled);
};

enableMapFilter('ad-form--disabled', true);
enableForm('ad-form--disabled', true);

const sendForm = document.querySelector('.ad-form');

const showMessage = (message, removeMessage) => {
  const errorWrapper = message.content.querySelector('.error');
  const successWrapper = message.content.querySelector('.success');
  let wrapper = '';

  if (errorWrapper === null) {
    wrapper = successWrapper;
    document.body.appendChild(wrapper);
  } else if (successWrapper === null) {
    wrapper = errorWrapper;
    document.body.appendChild(wrapper);
  }

  const documentClickHandler = () => {
    removeMessage();
  };

  const documentKeydownHandler = (evt) => {
    if (evt.keyCode === ESCAPE_CODE) {
      removeMessage();
    }
  };

  document.addEventListener('keydown', documentKeydownHandler);
  document.addEventListener('click', documentClickHandler);

  removeMessage = () => {
    wrapper.remove();
    document.removeEventListener('click', documentClickHandler);
    document.removeEventListener('keydown', documentKeydownHandler);
  };
};

const resetButton = document.querySelector('.ad-form__reset');

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  restoreParameters();
});

export {enableMapFilter, sendForm, enableForm, showMessage, resetButton};
