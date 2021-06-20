const ticketForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const ticketFormChildren = ticketForm.querySelectorAll('fieldset');
const filterFormChildren = filterForm.children;

const  disableForm = (selector='ad-form--disabled', token='disabled', boolean= false) => {
  ticketForm.classList.toggle(selector);
  ticketFormChildren.forEach((fieldset) => fieldset.toggleAttribute(token, boolean));
  filterForm.classList.toggle(selector);
  Array.from(filterFormChildren).forEach((fieldset) => fieldset.toggleAttribute(token, boolean));
};

disableForm('ad-form--disabled', 'disabled', true);

//TODO: Я пока не знаю когда и как должна сработать инициализация карты, поэтому пусть будет пока так:

document.addEventListener('click', ()=> {disableForm();}, {once: true});
