export { fetchCountries };
import Notiflix from 'notiflix';

function fetchCountries(country) {
  return fetch(
    `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
