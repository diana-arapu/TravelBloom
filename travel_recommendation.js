
var userInput; 
var json_data;
var recommendationDiv = document.getElementById('recommendation');
var destinationDiv;
var destinationTypes; // contains the destination types (string) such as "temples", "beaches" and "countries"
var types = []; // contains the json data for each destination type
var destinations = []; // contains the destination names (string)
var check = 0; // used to check if we found a destination type that contains an array element (such as "countries" containing "cities")



fetch('./travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error
                (`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    //saving the keywords (destination types) and destination names
    .then(data => {
        console.log(data); 
        json_data = getData(data);
    })
    .catch(error => {
        console.error('An error occurred with the fetch operation:', error);
    })

function getData(json_data){
    destinationTypes = Object.keys(json_data) //possible keywords saved as destination types
    for (const type in json_data) {
        types.push(json_data[type]);
        json_data[type].forEach(function(destination){
            destinations.push(destination.name)
        });
    }
    //console.log(destinationTypes);
    //console.log(types);
    //console.log(destinations);
}

//function that allows for searching both keywords and destinations
function searchDisplay(){
    recommendationDiv.innerHTML = "";
    recommendationDiv.style.display = "";
    userInput = document.getElementById('conditionInput').value;

    //handle recommendations display if input is a keyword rather than a destination
    if (destinationTypes.includes(userInput.toLowerCase())){
        //looping over all destination types
        types[destinationTypes.indexOf(userInput.toLowerCase())].forEach(function(destination){
            for (const key in destination){
                // if one of the destination types contains an array then we loop over the array contents to find details about the destination
                if(Array.isArray(destination[key])){
                    destination[key].forEach(function(dest){
                        destinationDiv = createDivs(dest, destination.name.concat(",", dest.name));
                        recommendationDiv.appendChild(destinationDiv);
                        check = 1;
                    });
                }
            }
            //if there was no array, then we can access the destinations directly
            if (check == 0){
                destinationDiv = createDivs(destination, destination.name);
                recommendationDiv.appendChild(destinationDiv);
            }
        });
            
        check = 0;

    }else if (destinations.includes(userInput)){
        for (const type in types){
            types[type].forEach(function(destination){
                if (destination.name == userInput){
                    for (const key in destination){
                        if(Array.isArray(destination[key])){
                            destination[key].forEach(function(dest){
                                destinationDiv = createDivs(dest, destination.name.concat(",", dest.name));
                                recommendationDiv.appendChild(destinationDiv);
                                check = 1;
                            });
                        }
                    }
                    if (check == 0){
                        destinationDiv = createDivs(destination, destination.name);
                        recommendationDiv.appendChild(destinationDiv);
                    }

                    check = 0;
                }
            });
        }
    }else{
        var alertDiv = document.createElement('div');
        alertDiv.classList.add('destination');

        var alert = document.createElement('h2');
        alert.textContent = "No match found for this keyword or destination. Please try a different keyword, such as 'beaches', 'temples' or 'countries'." ;
        
        alertDiv.appendChild(alert);
        recommendationDiv.appendChild(alertDiv);
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

    return destinationDiv;
}

function clearRecommendations(){
    recommendationDiv.innerHTML = "";
    recommendationDiv.style.display = "none";
}

