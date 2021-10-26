import {getError, addClass, removeClass, disableElement, turnOnElement} from './utils.js';
const MIN_NAME_LENGTH = 30;
const MAX_NAME_LENGTH = 100;
const MAX_PRICE = 1000000;

const form = document.querySelector('.ad-form');
const interactiveElements = form.querySelectorAll('.ad-form__element');
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const roomsSelect = document.querySelector('#room_number');
const guestsSelect = document.querySelector('#capacity');

const formFilters = document.querySelector('.map__filters');
const mapFilters = formFilters.querySelectorAll('.map__filter');
const mapFeatures = formFilters.querySelector('.map__features');

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${  MIN_NAME_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_NAME_LENGTH } симв.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

priceInput.addEventListener('input', () => {
  const priceValue = priceInput.value;

  if (priceValue > MAX_PRICE) {
    priceInput.setCustomValidity(`Цена за ночь не может быть выше ${  MAX_PRICE } рублей`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

form.addEventListener('submit', (evt) => {
  const roomsValue = Number(roomsSelect.value);
  const guestValue = Number(guestsSelect.value);
  if (roomsValue === 100 && guestValue !== 0) {
    evt.preventDefault();
    getError('100 комнат не для гостей');
  } else if (roomsSelect.value < guestsSelect.value) {
    evt.preventDefault();
    getError('Количество гостей не может быть больше количества комнат');
  }
});

addClass(form, 'ad-form--disabled');
interactiveElements.forEach((element) => {
  disableElement(element);
});

addClass(formFilters, 'map__filters--disabled');
mapFilters.forEach((element) => {
  disableElement(element);
});
disableElement(mapFeatures);

const activateForm = () => {
  removeClass(form, 'ad-form--disabled');
  interactiveElements.forEach((element) => {
    turnOnElement(element);
  });
  removeClass(formFilters, 'map__filters--disabled');
  mapFilters.forEach((element) => {
    turnOnElement(element);
  });
  turnOnElement(mapFeatures);
};

activateForm();
