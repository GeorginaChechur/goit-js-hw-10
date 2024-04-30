import axios from "axios";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";

import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';


const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfoDiv = document.querySelector('.cat-info');
const errorDisplay = document.querySelector('.error')

select.style.display = "none";
catInfoDiv.style.display = "none";
errorDisplay.style.display = "none";


loader.style.display = "block";
fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      select.appendChild(option);
    });
    loader.style.display = "none";
    select.style.display = "block";
     new SlimSelect(select, {
      placeholder: 'Select a breed'
    });
  })
  
  .catch(error => {
    console.error('Error fetching cat breeds:', error);
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
      loader.style.display = "none";
      // errorDisplay.style.display = "block";
  });



select.addEventListener('change', () => {
  const selectedBreedId = select.value;
  loader.style.display = "block";
    catInfoDiv.style.display = "none";
    errorDisplay.style.display = "none";
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      catInfoDiv.innerHTML = `<img src="${catData.url}" alt="Cat Image">
                              <p><strong>Breed:</strong> ${catData.breeds[0].name}</p>
                              <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
                              <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>`;
      loader.style.display = "none";
        catInfoDiv.style.display = "block";
    })
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
        loader.style.display = "none";
        errorDisplay.style.display = "block";

    });
});
