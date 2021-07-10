import {mapEnableHandler, sendForm} from './form.js';
import {getTickets} from './generation-data.js';
import {restrictSelect} from './utils.js';
import {ROOMS, capacitySelectItems, titleInput} from './restrictions.js';

//TODO: Много кода. Подозреваю, что это все можно сократить.

const CENTER_TOKIO_LATITUDE = 35.675;
const CENTER_TOKIO_LONGITUDE = 139.75;


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
    mapEnableHandler();
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


const setAddress = () => {
  addressInput.value = `${Number(CENTER_TOKIO_LATITUDE).toFixed(5)}, ${Number(CENTER_TOKIO_LONGITUDE).toFixed(5)}`;
};

setAddress();

markerMain.on('moveend', (evt) => {
  addressInput.value = (`${Number(evt.target.getLatLng().lat).toFixed(5)}, ${Number(evt.target.getLatLng().lng).toFixed(5)}`);
});

let markerGroup = L.layerGroup().addTo(map);

const createMarkerGroup = () => {
  markerGroup = L.layerGroup().addTo(map);
};

const createMarker = (similarObject) => {
  const {location, offer, author} = similarObject;
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

  titleInput.setCustomValidity('');
  titleInput.style.backgroundColor = 'white';

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
};

export {createMarker, restoreParameters, removeLayer, markerGroup, createMarkerGroup};
