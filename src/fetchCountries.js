const button = document.querySelector(".but")
const userList = document.querySelector('.country-list');

function fetchCountries() {
    return fetch('https://restcountries.com/v3.1/name/')
        .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
const b = 2
console.log(b)