const api = './travel_recommendation_api.json';
const json = fetch(api);

fetch(api)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data); // Handle the data (e.g., log it or update the UI)
    })
    .catch(error => {
        console.error('An error occurred with the fetch operation:', error);
    })