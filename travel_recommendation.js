
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

//saving the data needed in variables: possible keywords and destination names, as well as the json data for each keyword
function getData(json_data){
    destinationTypes = Object.keys(json_data) //possible keywords saved as destination types
    for (const type in json_data) {
        types.push(json_data[type]);
        json_data[type].forEach(function(destination){
            destinations.push(destination.name.toLowerCase())
        });
    }
}

//allowing for keyword variations
function variationOfKeyword(list, keyword){
    var bool = false;
    for (const word in list){
        if (list[word].includes(keyword) || list[word].includes(keyword.slice(0,(keyword.length-1)))){
            userInput = list[word];
            bool = true;
            break;
        }
    }
    return bool;
}

//function that allows for searching both keywords and destinations
function searchDisplay(){
    recommendationDiv.innerHTML = "";
    recommendationDiv.style.display = "";
    userInput = document.getElementById('conditionInput').value.toLowerCase();

    //handle recommendations display if input is a keyword rather than a destination
    if (destinationTypes.includes(userInput) || variationOfKeyword(destinationTypes, userInput)){
        //looping over all destination types
        types[destinationTypes.indexOf(userInput)].forEach(function(destination){
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

    //handle recommendations display if input is a destination
    }else if (destinations.includes(userInput)){
        for (const type in types){
            types[type].forEach(function(destination){
                if (destination.name.toLowerCase() == userInput){
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
    //if the keyword/destination was not found, we let the user know
    }else{
        var alertDiv = document.createElement('div');
        alertDiv.classList.add('destination');

        var alert = document.createElement('h2');
        alert.textContent = "No match found for this keyword or destination. Please try a different keyword, such as 'beaches', 'temples' or 'countries'." ;
        
        alertDiv.appendChild(alert);
        recommendationDiv.appendChild(alertDiv);
    }
}

//creating the div holding the recommendations
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

//hiding the recommendation div when user clears the search
function clearRecommendations(){
    recommendationDiv.innerHTML = "";
    recommendationDiv.style.display = "none";
}

