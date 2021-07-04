import {formEnableHandler} from './form.js';
import {getTickets} from './generation-data.js';
import {createFetch} from './server-data.js';

//TODO: Много кода. Подозреваю, что это все можно сократить.

const CENTER_TOKIO_LATITUDE = 35.675;
const CENTER_TOKIO_LONGITUDE = 139.75;

const map = L.map('map-canvas')
  .on('load', () => {
    formEnableHandler();
  })
  .setView({
    lat: CENTER_TOKIO_LATITUDE,
    lng: CENTER_TOKIO_LONGITUDE,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

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
addressInput.value = `${Number(CENTER_TOKIO_LATITUDE).toFixed(5)}, ${Number(CENTER_TOKIO_LONGITUDE).toFixed(5)}`;

markerMain.on('moveend', (evt) => {
  addressInput.value = (`${Number(evt.target.getLatLng().lat).toFixed(5)}, ${Number(evt.target.getLatLng().lng).toFixed(5)}`);
});

//TODO: Вернуть метку при отправке формы в начальное положение.
const sendForm = document.querySelector('.ad-form');

//TODO: Я потом этот обработчик видоизменю, исходя из ТЗ. А пока он просто возвращает метку на место.
sendForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  markerMain.setLatLng({
    lat: CENTER_TOKIO_LATITUDE,
    lng: CENTER_TOKIO_LONGITUDE,
  });

  map.setView({
    lat: CENTER_TOKIO_LATITUDE,
    lng: CENTER_TOKIO_LONGITUDE,
  }, 12);

  addressInput.value = `${Number(CENTER_TOKIO_LATITUDE).toFixed(5)}, ${Number(CENTER_TOKIO_LONGITUDE).toFixed(5)}`;
});

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
    .addTo(map)
    .bindPopup(getTickets(offer, author),
      {
        keepInView: true,
      },
    );
};

const fetchData = createFetch(
  (data) => {
    data.forEach((similarObject) => {
      createMarker(similarObject);
    });
  },
  (err) => {
    throw new Error(err);
  });

fetchData();
