import {createMarker, createMarkerGroup, markerGroup, removeLayer} from './map.js';
import {debounce} from './utils.js';

const HOUSE_PRICE_RANGE = {
  MIN: 10000,
  MAX: 50000,
};

const SIMILAR_OBJECT_COUNT = 10;

const filterForm = document.querySelector('.map__filters');
const houseTypeFilter = filterForm.querySelector('#housing-type');
const housePriceFilter = filterForm.querySelector('#housing-price');
const houseRoomsFilter = filterForm.querySelector('#housing-rooms');
const houseGuestsFilter = filterForm.querySelector('#housing-guests');

const isSelectedHouseType = (similarObject) => {
  const {offer} = similarObject;
  if (houseTypeFilter.value === 'any' || houseTypeFilter.value === `${offer.type}`) {
    return true;
  }
};

const isSelectedPrice = (similarObject) => {
  const {offer} = similarObject;
  if (housePriceFilter.value === 'any') {
    return true;
  } else if (housePriceFilter.value === 'low' && HOUSE_PRICE_RANGE.MIN >= offer.price) {
    return true;
  } else if (housePriceFilter.value === 'middle' && offer.price > HOUSE_PRICE_RANGE.MIN && offer.price < HOUSE_PRICE_RANGE.MAX) {
    return true;
  } else if (housePriceFilter.value === 'high' && offer.price >= HOUSE_PRICE_RANGE.MAX) {
    return true;
  } else {
    return false;
  }
};

const isSelectedRooms = (similarObject) => {
  const {offer} = similarObject;
  if (houseRoomsFilter.value === 'any' || houseRoomsFilter.value === `${offer.rooms}`) {
    return true;
  }
};

const isSelectedGuests = (similarObject) => {
  const {offer} = similarObject;
  if (houseGuestsFilter.value === 'any' || houseGuestsFilter.value === `${offer.guests}`) {
    return true;
  }
};

const isSelectedFeatures = (similarObject) => {
  const houseFeaturesChecked = filterForm.querySelectorAll('input:checked');
  let houseFeature = true;
  Array.from(houseFeaturesChecked).every((checkbox) => {
    const {offer} = similarObject;
    if (typeof offer.features !== 'undefined') {
      houseFeature = offer.features.indexOf(checkbox.value) !== -1;
      return houseFeature;
    }
  });
  return houseFeature;
};

const filterSimilarObjects = (similarObject) => isSelectedHouseType(similarObject) && isSelectedPrice(similarObject) && isSelectedRooms(similarObject) && isSelectedGuests(similarObject) && isSelectedFeatures(similarObject);

const createNewTickets = (similarObject) => debounce(() => {
  removeLayer(markerGroup);
  createMarkerGroup(markerGroup);
  const similarObjectsFiltered = similarObject.filter((similarObj) => filterSimilarObjects(similarObj));
  (similarObjectsFiltered.slice(0, SIMILAR_OBJECT_COUNT).forEach((similarObjectFiltered) => createMarker(similarObjectFiltered)));
});

const changeFormHandler = (similarObject) => {
  filterForm.addEventListener('change', createNewTickets(similarObject));
};

const getFilter = (similarObject) => {
  (similarObject.slice(0, SIMILAR_OBJECT_COUNT).forEach((similarObj) => createMarker(similarObj)));
  changeFormHandler(similarObject);
};

export {getFilter};
