import {createMarker, removeLayer, markerGroup, createMarkerGroup} from './map.js';

const filterForm = document.querySelector('.map__filters');

const getFilter = (similarObject) => {
  createMarker(similarObject);
  const {offer} = similarObject;
  filterForm.addEventListener('change', async (evt) => {
    await removeLayer(markerGroup);
    await createMarkerGroup(markerGroup);
    const filterTarget = evt.target.value;
    if (filterTarget === 'any') {
      createMarker(similarObject);
    } else if (filterTarget === `${offer.type}`) {
      createMarker(similarObject);
    }
  });
};

export {getFilter};

