const ALERT_SHOW_TIME = 7000;

const getVerification = (selector, container, condition) => {
  if (condition) {
    container.querySelector(selector).classList.add('hidden');
  }
};

const restrictSelect = (conditions, collectionItems) => {
  Array.from(collectionItems).forEach((collectionItem) => {
    collectionItem.disabled = !conditions.includes(Number(collectionItem.value));
    collectionItem.enabled = conditions.includes(Number(collectionItem.value));
    collectionItem.selected = !(collectionItem.disabled + conditions.length - 1);
  });
};

const timeChangeHandler = (linkedItems) => (evt) => {
  linkedItems.value = evt.target.value;
};

const restoreInputParameters = (inputName) => {
  inputName.setCustomValidity('');
  inputName.style.backgroundColor = 'white';
  inputName.style.border = '2px solid transparent';
};

const showAlert = (message, messagePositionValue = '0', color = 'red') => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '500';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = messagePositionValue;
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = color;

  alertContainer.textContent = 'Кажется что-то пошло не так. Попробуйте перезагрузить страницу. Если это не помогло, подождите какое-то время и перезагрузите страницу еще раз.';

  document.body.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getVerification, restrictSelect, timeChangeHandler, showAlert, debounce, restoreInputParameters};
