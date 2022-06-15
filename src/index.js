import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { getRefs } from './resource/refs';
import { fetchCountries } from './request/fetchCountries';
import { getMarkup } from './Cards/markup';
import { getCardMarkup } from './Cards/card-markup';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const { inputEl, listEl } = getRefs();

// Event listeners
inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// Functions
function onInput(event) {
  const userData = event.target.value.trim();
  if (userData === '') {
    listEl.innerHTML = '';
    return;
  }
  fetchCountries(userData)
    .then(response => {
      if (response.length > 10) {
        return Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (response.length > 1 && response.length <= 10) {
        getMarkup(response);
        return;
      }
      if (response.length === 1) {
        getCardMarkup(response[0]);
      }
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}