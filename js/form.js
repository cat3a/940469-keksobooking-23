import {restoreParameters} from './map.js';

const ESCAPE_CODE = 27;

const ticketForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const ticketFormChildren = ticketForm.querySelectorAll('fieldset');
const filterFormChildren = filterForm.children;
/*TODO: Я пока все-таки оставлю на самих формах добавление/снятие класса, так как исходя из ТЗ сильно напрашивается. Меня смущает:
Цитата: "Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form — на форму добавлен специальный класс,
  а на её интерактивные элементы атрибуты disabled".
*/
const mapEnableHandler = (selector = 'ad-form--disabled', isDisabled = false) => {
  ticketForm.classList.toggle(selector, isDisabled);
  ticketFormChildren.forEach((fieldset) => fieldset.disabled = isDisabled);
};

const formEnableHandler = (selector = 'ad-form--disabled', isDisabled = false) => {
  filterForm.classList.toggle(selector, isDisabled);
  Array.from(filterFormChildren).forEach((fieldset) => fieldset.disabled = isDisabled);
};

mapEnableHandler('ad-form--disabled', true);
formEnableHandler('ad-form--disabled', true);

//TODO: Вернуть метку при отправке формы в начальное положение.
const sendForm = document.querySelector('.ad-form');

const removeMessage = () => {
  const error = document.querySelector('.error');
  const success = document.querySelector('.success');
  if (error !== null) {
    error.remove();
  } else if (success !== null) {
    success.remove();
  }
};

const showMessage = (message) => {
  let messageClickHandler = () => {
  };
  let messageKeydownHandler = () => {
  };

  const removeEventListener = (type, handlerName) => {
    removeMessage();
    document.removeEventListener(type, handlerName);
  };

  document.body.appendChild(message.content);

  document.addEventListener('click', messageClickHandler = () => {
    removeEventListener('keydown', messageKeydownHandler);
  }, {once: true});

  document.addEventListener('keydown', messageKeydownHandler = (evt) => {
    if (evt.keyCode === ESCAPE_CODE) {
      removeEventListener('click', messageClickHandler);
    }
  }, {once: true});

};

const resetButton = document.querySelector('.ad-form__reset');

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  restoreParameters();
});

export {mapEnableHandler, sendForm, removeMessage, formEnableHandler, showMessage};
