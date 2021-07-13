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
const enableMapFilter = (selector = 'ad-form--disabled', isDisabled = false) => {
  ticketForm.classList.toggle(selector, isDisabled);
  ticketFormChildren.forEach((fieldset) => fieldset.disabled = isDisabled);
};

const enableForm = (selector = 'ad-form--disabled', isDisabled = false) => {
  filterForm.classList.toggle(selector, isDisabled);
  Array.from(filterFormChildren).forEach((fieldset) => fieldset.disabled = isDisabled);
};

enableMapFilter('ad-form--disabled', true);
enableForm('ad-form--disabled', true);

//TODO: Вернуть метку при отправке формы в начальное положение.
const sendForm = document.querySelector('.ad-form');

const showMessage = (message, removeMessage) => {

  document.body.appendChild(message.content);

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
    document.body.removeChild(document.body.children[document.body.children.length - 1]);
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
