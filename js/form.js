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
const enableMap = (selector = 'ad-form--disabled', isDisabled = false) => {
  ticketForm.classList.toggle(selector, isDisabled);
  ticketFormChildren.forEach((fieldset) => fieldset.disabled = isDisabled);
};

const enableForm = (selector = 'ad-form--disabled', isDisabled = false) => {
  filterForm.classList.toggle(selector, isDisabled);
  Array.from(filterFormChildren).forEach((fieldset) => fieldset.disabled = isDisabled);
};

enableMap('ad-form--disabled', true);
enableForm('ad-form--disabled', true);

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

  const messageClickHandler = () => removeMessage();

  const messageKeyCodeHandler = (evt) => {
    if (evt.keyCode === ESCAPE_CODE) {
      removeMessage();
    }
  };

  document.removeEventListener('click', messageClickHandler);
  document.removeEventListener('keydown', messageKeyCodeHandler);

  document.body.appendChild(message.content);

  const closeMessage = () => {
    document.addEventListener('keydown', messageKeyCodeHandler);
    document.addEventListener('click', messageClickHandler);
  };
  closeMessage();
};

const resetButton = document.querySelector('.ad-form__reset');

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  restoreParameters();
});

export {enableMap, sendForm, removeMessage, enableForm, showMessage, resetButton};
