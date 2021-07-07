import {createFetch} from './server-data.js';
import {showAlert} from './utils.js';
import {restoreParameters, createMarker} from './map.js';
//import {compareObjects} from './filters.js';
import {getFilter} from './filters.js';
//import {similarObjects} from './map-data.js';

const FORM_SEND_ADDRESS = 'https://23.javascript.pages.academy/keksobooking';
const SIMILAR_OBJECT_COUNT = 10;

const ticketForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const ticketFormChildren = ticketForm.querySelectorAll('fieldset');
const filterFormChildren = filterForm.children;

/*TODO: Я пока все-таки оставлю на самих формах добавление/снятие класса, так как исходя из ТЗ сильно напрашивается. Меня смущает:
Цитата: "Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form — на форму добавлен специальный класс,
  а на её интерактивные элементы атрибуты disabled".
*/
const formEnableHandler = (selector = 'ad-form--disabled', isDisabled = false) => {
  ticketForm.classList.toggle(selector, isDisabled);
  ticketFormChildren.forEach((fieldset) => fieldset.disabled = isDisabled);
  filterForm.classList.toggle(selector, isDisabled);
  Array.from(filterFormChildren).forEach((fieldset) => fieldset.disabled = isDisabled);
};

formEnableHandler('ad-form--disabled', true);

//TODO: Вернуть метку при отправке формы в начальное положение.
const sendForm = document.querySelector('.ad-form');

const removeMessage = () => {
  const error = document.querySelector('.error');
  const success = document.querySelector('.success');
  if (document.body.contains(error)) {
    error.remove();
  } else if (document.body.contains(success)) {
    success.remove();
  }
};

const errorMessage = document.querySelector('#error');
const successMessage = document.querySelector('#success');

const showMessage = (message) => {
  let clickId = () => {
  };
  let keydownId = () => {
  };
  document.body.appendChild(message.content);
  document.addEventListener('click', clickId = () => {
    removeMessage();
    document.removeEventListener('keydown', keydownId);
  }, {once: true});
  document.addEventListener('keydown', keydownId = (evt) => {
    if (evt.keyCode === 27) {
      removeMessage();
      document.removeEventListener('click', clickId);
    }
  }, {once: true});
};

sendForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const errorMessageShow = errorMessage.cloneNode(true);
  const successMessageShow = successMessage.cloneNode(true);

  fetch(
    FORM_SEND_ADDRESS,
    {
      method: 'POST',
      body: formData,
    },
  ).then((response) => {
    if (response.ok) {
      showMessage(successMessageShow);
      restoreParameters();
    } else {
      showMessage(errorMessageShow);
    }
  }).catch(() => {
    showMessage(errorMessageShow);
  });
});

const resetButton = document.querySelector('.ad-form__reset');

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  restoreParameters();
});

const fetchData = createFetch(
  (data) => {
    data//.slice(0, SIMILAR_OBJECT_COUNT)
      .slice()
      .forEach((similarObject) => {
        getFilter(similarObject);
      });
  },
  (error) => {
    showAlert(error);
  });

fetchData();

export {formEnableHandler, sendForm, removeMessage};
