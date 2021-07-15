import {createMarker, createMarkerGroup, removeLayer} from './map.js';
import {debounce} from './utils.js';
import {resetButton, sendForm} from './form.js';

const HOUSE_PRICE_RANGE = {
  any: {
    min: 0,
    max: Infinity,
  },
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: Infinity,
  },
};

const SIMILAR_OBJECT_COUNT = 10;
const SPECIAL_VALUE = 'any';

const filterForm = document.querySelector('.map__filters');
const houseTypeFilter = filterForm.querySelector('#housing-type');
const housePriceFilter = filterForm.querySelector('#housing-price');
const houseRoomsFilter = filterForm.querySelector('#housing-rooms');
const houseGuestsFilter = filterForm.querySelector('#housing-guests');


const isSelectedHouseType = (similarObjects) => {
  const {offer} = similarObjects;
  return houseTypeFilter.value === SPECIAL_VALUE || houseTypeFilter.value === `${offer.type}`;
};

const isSelectedPrice = (similarObjects) => {
  const {offer} = similarObjects;
  return offer.price <= HOUSE_PRICE_RANGE[housePriceFilter.value].max && offer.price >= HOUSE_PRICE_RANGE[housePriceFilter.value].min;
};

const isSelectedRooms = (similarObjects) => {
  const {offer} = similarObjects;
  return houseRoomsFilter.value === SPECIAL_VALUE || houseRoomsFilter.value === `${offer.rooms}`;
};

const isSelectedGuests = (similarObjects) => {
  const {offer} = similarObjects;
  return houseGuestsFilter.value === SPECIAL_VALUE || houseGuestsFilter.value === `${offer.guests}`;
};

const isSelectedFeatures = (similarObject) => {
  const houseFeaturesChecked = filterForm.querySelectorAll('input:checked');
  return Array.from(houseFeaturesChecked).every((checkbox) => {
    const {offer} = similarObject;
    if (Array.isArray(offer.features)) {
      return offer.features.includes(checkbox.value);
    }
  });
};

const filterSimilarObjects = (similarObject) => isSelectedHouseType(similarObject) && isSelectedPrice(similarObject) && isSelectedRooms(similarObject) && isSelectedGuests(similarObject) && isSelectedFeatures(similarObject);

const createNewTickets = (similarObject) => debounce(() => {
  removeLayer();
  createMarkerGroup();
  const similarObjectsFiltered = similarObject.filter((data) => filterSimilarObjects(data));
  similarObjectsFiltered.slice(0, SIMILAR_OBJECT_COUNT).forEach((similarObjectFiltered) => createMarker(similarObjectFiltered));
});

const changeFormHandler = (similarObjects) => createNewTickets(similarObjects);

const sendFormHandler = (similarObjects) => createNewTickets(similarObjects);

const resetButtonHandler = (similarObjects) => createNewTickets(similarObjects);

const getChangeFormHandler = (similarObjects) => {
  filterForm.addEventListener('change', changeFormHandler(similarObjects));
};

const getSendFormHandler = (similarObjects) => {
  sendForm.addEventListener('submit', sendFormHandler(similarObjects));
};

const getResetButtonHandler = (similarObjects) => {
  resetButton.addEventListener('click', resetButtonHandler(similarObjects));
};

const getFilter = (similarObjects) => {
  similarObjects.slice(0, SIMILAR_OBJECT_COUNT).forEach((similarObject) => createMarker(similarObject));
  getChangeFormHandler(similarObjects);
  getResetButtonHandler(similarObjects);
  getSendFormHandler(similarObjects);
};

export {getFilter};
