import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_YdAdDJAF61GOGsQAgG5F2rwzq2CUzdyZURocTTyo24sFz8hCAkeq2UZmlbogkU8Q";

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds')
      .then(response => {
          return response.data
      })
    .catch(error => {
      throw new Error('Failed to fetch cat breeds');
    });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then(response => {
          return response.data[0]
      })
    .catch(error => {
      throw new Error('Failed to fetch cat by breed');
    });
}
