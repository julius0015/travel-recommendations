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
    resultsContainer.innerHTML = '';

    if (searchTerm.includes('beach') && data.beaches) {
        data.beaches.slice(0, 2).forEach(beach => {
            resultsContainer.innerHTML += `<div><img src="${beach.imageUrl}" alt="${beach.name}"><p><strong>${beach.name}</strong></p><p>${beach.description}</p></div>`;
        });
    } else if (searchTerm.includes('temple') && data.temples) {
        data.temples.slice(0, 2).forEach(temple => {
            resultsContainer.innerHTML += `<div><img src="${temple.imageUrl}" alt="${temple.name}"><p><strong>${temple.name}</strong></p><p>${temple.description}</p></div>`;
        });
    } else if (searchTerm.includes('country') && data.countries) {
        data.countries.slice(0, 2).forEach(country => {
            resultsContainer.innerHTML += `<div><img src="${country.imageUrl}" alt="${country.name}"><p><strong>${country.name}</strong></p><p>${country.description}</p></div>`;
        });
    } else if (searchTerm) {
        resultsContainer.innerHTML = '<p>No recommendations found for your search.</p>';
    }
    });


    .catch(error => {
        console.error("Error fetching data:", error);
    });
