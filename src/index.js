import './css/styles.css';
import Notiflix from 'notiflix';
const input = document.querySelector('#search-box');
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
const list = document.querySelector('.country-list');
list.style.listStyleType = "none"
const div = document.querySelector('.country-info');
div.style.listStyleType = "none"

input.addEventListener(
  'input',
  debounce(e => {
    fetchUsers(e.target.value.trim())
      .then(data => fetchCountries(data))
      .catch(err => console.log('Error', err));

    function fetchCountries(name) {
      list.innerHTML = '';
      div.innerHTML = '';
      if (name.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (name.length <= 10 && name.length >= 2) {
        for (let i = 0; i < name.length; i++) {
          const element = `<li><svg class="svg" width="40" height="20"><image xlink:href="${name[i].flags.svg}" src="${name[i].flags.png}" width="40" height="20"/></svg>${name[i].name}</li>`;
          list.insertAdjacentHTML('afterbegin', element);
        }
      } 
      else {
        const element = `<li class="one"><svg class="svg" width="50" height="40"><image xlink:href="${name[0].flags.svg}" src="${name[0].flags.png}" width="60" height="40"/></svg>${name[0].name}</li>`;
        list.insertAdjacentHTML('afterbegin', element);
        const elementv2 = `<li class="listmain"><span class="main">Capital:</span><span class="value">${name[0].capital}</span></li><li class="listmain"><span class="main">Population:</span><span class="value">${name[0].population}</span></li><li class="listmain"><span class="main">Languages:</span><span class="value">${name[0].languages[0].name}</span></li>`;
        div.insertAdjacentHTML('afterbegin', elementv2);
        
      }
    }

    function fetchUsers(smt) {
      return fetch(
        `https://restcountries.com/v2/name/${smt}?fields=name,capital,population,languages,flags`
      ).then(response => {
        if (!response.ok) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
          throw new Error(response.status);
          
        }
        return response.json();
      });
    }
  }, 300)
);
