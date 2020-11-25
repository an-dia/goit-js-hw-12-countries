const BASE_URL = 'https://restcountries.eu/rest/v2';

async function fetchCountries(searchQuery) {
  // return fetch(`${BASE_URL}/name/${searchQuery}`)
  //   .then(response => response.json()) 
  const response = await fetch(`${BASE_URL}/name/${searchQuery}`);
  const countries = await response.json();
  return countries;
}

export default {fetchCountries}
