import './css/styles.css';
const input = document.querySelector('#search-box');
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce((e) => {
    
    fetchUsers(e.target.value)
      .then(data => fetchCountries(data))
      .catch(err => console.log('Error', err));
    
     
     function fetchCountries(name) {
       console.log(name[0].capital);
     }
    
     function fetchUsers(smt) {
       return fetch(
         `https://restcountries.com/v2/name/${smt}?fields=name,capital,population,languages,flags`
       ).then(response => {
         if (!response.ok) {
           throw new Error(response.status);
         }
         return response.json();
       });
     }

},3000));








