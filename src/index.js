import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry(e) {
  countryInfoEl.innerHTML = '';
  countryListEl.innerHTML = '';
  let markup = '';
  const countryEntered = e.target.value.trim();

  if (countryEntered) {
    fetchCountries(countryEntered).then(countriesEntered => {
      if (countriesEntered.length === 1) {
        countriesEntered.map(country => {
          markup = makeMarkupOne(country);
        });
        countryInfoEl.insertAdjacentHTML('beforeend', markup);
      } else if (countriesEntered.length > 1 && countriesEntered.length <= 10) {
        countriesEntered.map(country => {
          markup += makeMarkupFew(country);
        });
        countryListEl.insertAdjacentHTML('beforeend', markup);
      } else if (countriesEntered.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    });
  }
}

function makeMarkupOne(country) {
  const {
    name: { common },
    flags: { svg },
    capital,
    population,
    languages,
  } = country;

  return `<ul>
  <li><img src=${svg} width=30px> <span class='country-name'>${common}</span></li>
  <li><span class='title'>Capital:</span> ${capital}</li>
  <li><span class='title'>Population:</span> ${population}</li>
  <li><span class='title'>Languages:</span> ${Object.values(languages).join(
    ', '
  )}</li>
  </ul>`;
}

function makeMarkupFew(countries) {
  const {
    name: { common },
    flags: { svg },
  } = countries;

  return `<li><img src=${svg} width=20px> ${common}</li>`;
}
