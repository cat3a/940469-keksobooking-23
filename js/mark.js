import {formEnableHandler} from './form.js';
import {similarObjects} from './map-data.js';
import {getTickets} from './generation-data.js';

//TODO: Здесь начинается использование Leaflet.

const map = L.map('map-canvas')
  .on('load', () => {
    formEnableHandler();
  })
  .setView({
    lat: 35.6894,
    lng: 139.692,
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
    lat: 35.6894,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

markerMain.addTo(map);

const addressInput = document.querySelector('#address');
addressInput.value = `${Number(35.6894).toFixed(5)}, ${Number(139.692).toFixed(5)}`;

markerMain.on('moveend', (evt) => {
  addressInput.value = `${evt.target.getLatLng()}`.slice(7, -1).split(',').map((coordinate) => (Number(coordinate).toFixed(5))).join(', ');
});

//TODO: Вернуть метку при отправке формы в начальное положение.
const sendForm = document.querySelector('.ad-form');

//TODO: я потом этот обработчик видоизменю, исходя из ТЗ. А пока он просто возвращает метку на место.
sendForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  markerMain.setLatLng({
    lat: 35.6894,
    lng: 139.692,
  });

  map.setView({
    lat: 35.6894,
    lng: 139.692,
  }, 12);

  addressInput.value = `${Number(35.6894).toFixed(5)}, ${Number(139.692).toFixed(5)}`;
});

const tickets = [];

Array.from(getTickets().children).forEach((ticket) => {
  tickets.push(ticket);
});

let item = 0;

const createMarker = (point) => {
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const lat = point.location.lat;
  const lng = point.location.lng;
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
    .bindPopup(tickets[item],
      {
        keepInView: true,
      },
    );
  item++;
};

similarObjects.forEach((point) => {
  createMarker(point);
});
