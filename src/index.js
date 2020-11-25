const debounce = require('lodash.debounce');
import './styles.scss';
import { error } from'@pnotify/core';
import"@pnotify/core/dist/PNotify.css";
import '@pnotify/core/dist/BrightTheme.css';
import API from './scripts/api-service'
import getRefs from './scripts/get-refs'
import countryMarkupTpl from './templates/country-markup.hbs';
import countryListTpl from './templates/country-list.hbs'

const refs = getRefs();

refs.input.addEventListener('input', debounce(onSearch, 500));


async function onSearch(e) {
  e.preventDefault();
  clearContainer();
  const searchQuery = e.target.value.trim();

  // API.fetchCountries(searchQuery)
  //   .then(renderCountriesCard)
  try {
    const country = await API.fetchCountries(searchQuery);
    const renderCountries = await renderCountriesCard(country);
    return renderCountries;
  } catch (error) {
    console.log(error.message);
  }
}




function renderCountriesCard(countries) {
  const markup = countryMarkupTpl(countries);
  const list = countryListTpl(countries);
 
  if (countries.length > 10 ) {
     error({
      text: "Too many matches found. Pleas enter a more specific query!",
     type: 'info'
    })
    return;
  }

  if (countries.length >= 2 && countries.length <= 10)
  {
    refs.cardContainer.insertAdjacentHTML('beforeend', list);
    return;
  }

   if (countries.length === 1)
   {
     refs.cardContainer.insertAdjacentHTML('beforeend', markup);
     return;
   }
  
  if (countries.status === 404) {
     error({
      text: "О-о, что-то пошло не так! Не верный ввод. Ваша страна не найдена!!!",
     type: 'info'
    })
    return;
  }
}



function clearContainer() {
  refs.cardContainer.innerHTML = '';
  
}




