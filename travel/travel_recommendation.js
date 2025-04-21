fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        console.log("Travel Recommendation Data:", data);
        // Further JavaScript logic for search and display will go here (Task 7 & 8)
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
