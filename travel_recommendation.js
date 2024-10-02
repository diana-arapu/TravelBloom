fetch('./travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error
                (`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); 
    })
    .catch(error => {
        console.error('An error occurred with the fetch operation:', error);
    })