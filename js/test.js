import {createMarker, createMarkerGroup, markerGroup, removeLayer} from './map.js';

const HOUSE_PRICE_RANGE = {
  MIN: 10000,
  MAX: 50000,
};

const filterForm = document.querySelector('.map__filters');
const houseTypeFilter = filterForm.querySelector('#housing-type');
const housePriceFilter = filterForm.querySelector('#housing-price');

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
  } else if (housePriceFilter.value === 'low' && offer.price <= HOUSE_PRICE_RANGE.MIN) {
    return true;
  } else if (housePriceFilter.value === 'middle' && offer.price > HOUSE_PRICE_RANGE.MIN && offer.price < HOUSE_PRICE_RANGE.MAX) {
    return true;
  } else if (housePriceFilter.value && offer.price >= HOUSE_PRICE_RANGE.MAX) {
    return true;
  } else {
    return false;
  }
};

const filterSimilarObjects = (similarObject) => isSelectedHouseType(similarObject) && isSelectedPrice(similarObject);

const getFilter = async (similarObject) => {
  filterForm.addEventListener('change', async () => {
    await removeLayer(markerGroup);
    await createMarkerGroup(markerGroup);
    similarObject = similarObject.filter((similarObj) => filterSimilarObjects(similarObj));
    createMarker(similarObject);
  });
};

export {getFilter};
