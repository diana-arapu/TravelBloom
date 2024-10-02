
var countries
var temples
var beaches

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
        countries = data.countries
        temples = data.temples
        beaches = data.beaches
    })
    .catch(error => {
        console.error('An error occurred with the fetch operation:', error);
    })

function searchDisplay(){
    const keyword = document.getElementById('conditionInput').value;

    var recommendationDiv = document.getElementById('recommendation');
    recommendationDiv.innerHTML = "";
    recommendationDiv.style.display = "";
    if (keyword.toLowerCase() == "beach" || keyword.toLowerCase() == "beaches"){
        beaches.forEach(function(destination) {
            var destinationDiv = createDivs(destination);
            recommendationDiv.appendChild(destinationDiv);
        });
    }else if (keyword.toLowerCase() == "temple" || keyword.toLowerCase() == "temples"){
        temples.forEach(function(destination) {
            var destinationDiv = createDivs(destination);
            recommendationDiv.appendChild(destinationDiv);
        });

    }else if (keyword.toLowerCase() == "country" || keyword.toLowerCase() == "countries"){
        countries.forEach(function(country) {
            country.cities.forEach(function(destination) {
                var destinationDiv = document.createElement('div');
                destinationDiv.classList.add('destination');

                var img = document.createElement('img');
                img.src = destination.imageUrl;

                var title = document.createElement('h2');
                title.textContent = country.name.concat(", ", destination.name);

                var description = document.createElement('p');
                description.textContent = destination.description;

                var visitBtn = document.createElement('button');
                visitBtn.classList.add('btn');
                visitBtn.textContent = "Visit";

                destinationDiv.appendChild(title);
                destinationDiv.appendChild(img);
                destinationDiv.appendChild(description);
                destinationDiv.appendChild(visitBtn);
        
                recommendationDiv.appendChild(destinationDiv);
            });
        });
    }else{
        alert("No match found for the keyword")
    }
}

function createDivs(destination){
    var destinationDiv = document.createElement('div');
    destinationDiv.classList.add('destination');

    var img = document.createElement('img');
    img.src =destination.imageUrl;

    var title = document.createElement('h2');
    title.textContent = destination.name;

    var description = document.createElement('p');
    description.textContent = destination.description;

    var visitBtn = document.createElement('button');
    visitBtn.classList.add('btn');
    visitBtn.textContent = "Visit";
    
    destinationDiv.appendChild(title);
    destinationDiv.appendChild(img);
    destinationDiv.appendChild(description);
    destinationDiv.appendChild(visitBtn);

    return destinationDiv
}


