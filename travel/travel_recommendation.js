fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        console.log("Travel Recommendation Data:", data);
        // Further JavaScript logic for search and display will go here (Task 7 & 8)
    })
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.createElement('div'); // Create a container for results
    document.body.appendChild(resultsContainer); // Append it to the body

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    resultsContainer.innerHTML = ''; // Clear previous results

    if (searchTerm.includes('beach')) {
        // Logic to display beach recommendations (Task 8)
    } else if (searchTerm.includes('temple')) {
        // Logic to display temple recommendations (Task 8)
    } else if (searchTerm.includes('country')) {
        // Logic to display country recommendations (Task 8)
    } else if (searchTerm) {
        resultsContainer.innerHTML = '<p>No recommendations found for your search.</p>';
    }
});

    .catch(error => {
        console.error("Error fetching data:", error);
    });
