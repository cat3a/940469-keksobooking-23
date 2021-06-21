const ticketForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const ticketFormChildren = ticketForm.querySelectorAll('fieldset');
const filterFormChildren = filterForm.children;

const  disableForm = (selector='ad-form--disabled', token='disabled', booleanSwitch= false) => {
  ticketForm.classList.toggle(selector, booleanSwitch);
  ticketFormChildren.forEach((fieldset) => fieldset.toggleAttribute(token, booleanSwitch));
  filterForm.classList.toggle(selector, booleanSwitch);
  Array.from(filterFormChildren).forEach((fieldset) => fieldset.toggleAttribute(token, booleanSwitch));
};

disableForm('ad-form--disabled', 'disabled', true);

//TODO: Я пока не знаю когда и как должна сработать инициализация карты, поэтому пусть будет пока так:

document.addEventListener('click', ()=> {disableForm();});
