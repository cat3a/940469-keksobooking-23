import {enableForm, sendForm} from './form.js';
import {getTickets} from './generation-data.js';
import {restrictSelect, restoreInputParameters} from './utils.js';
import {ROOMS, capacitySelectItems, titleInput, priceInput, HOUSE_PRICES} from './restrictions.js';
import {avatarPreviewField, photoPreviewField, AVATAR_DEFAULT, PHOTO_DEFAULT} from './avatar.js';

const CENTER_TOKIO_LATITUDE = 35.675;
const CENTER_TOKIO_LONGITUDE = 139.75;

const mapFilters = document.querySelector('.map__filters');

const map = L.map('map-canvas')
  .setView({
    lat: CENTER_TOKIO_LATITUDE,
    lng: CENTER_TOKIO_LONGITUDE,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map)
  .on('load', () => {
    enableForm();
  });

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const markerMain = L.marker(
  {
    lat: CENTER_TOKIO_LATITUDE,
    lng: CENTER_TOKIO_LONGITUDE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

markerMain.addTo(map);

const addressInput = document.querySelector('#address');

const setAddress = (evt, LATITUDE = CENTER_TOKIO_LATITUDE, LONGITUDE = CENTER_TOKIO_LONGITUDE) => {
  addressInput.value = `${Number(LATITUDE).toFixed(5)}, ${Number(LONGITUDE).toFixed(5)}`;
};

setAddress();

markerMain.on('moveend', (evt) => {
  setAddress(evt, evt.target.getLatLng().lat, evt.target.getLatLng().lng);
});

let markerGroup = L.layerGroup().addTo(map);

const createMarkerGroup = () => {
  markerGroup = L.layerGroup().addTo(map);
};

const createMarker = (similarObjects) => {
  const {location, offer, author} = similarObjects;
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const lat = Number(location.lat);
  const lng = Number(location.lng);
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );
  marker
    .addTo(markerGroup)
    .bindPopup(
      getTickets(offer, author),
      {
        keepInView: true,
      },
    );
};

const removeLayer = () => {
  markerGroup.remove();
};

const restoreParameters = () => {
  sendForm.reset();
  avatarPreviewField.src = AVATAR_DEFAULT;
  photoPreviewField.src = PHOTO_DEFAULT;

  restoreInputParameters(titleInput);
  restoreInputParameters(priceInput);
  priceInput.min = HOUSE_PRICES['flat'];
  priceInput.placeholder = HOUSE_PRICES['flat'];

  restrictSelect(ROOMS['for 1 guests']['values'], capacitySelectItems);

  markerMain.setLatLng({
    lat: CENTER_TOKIO_LATITUDE,
    lng: CENTER_TOKIO_LONGITUDE,
  });

  map.setView({
    lat: CENTER_TOKIO_LATITUDE,
    lng: CENTER_TOKIO_LONGITUDE,
  }, 13);

  setAddress();
  mapFilters.reset();
};

export {createMarker, restoreParameters, removeLayer, createMarkerGroup};
