// travel_recommendation.js
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const resultsContainer = document.getElementById('resultsContainer');

fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        console.log("Travel Recommendation Data:", data);

        searchBtn.addEventListener('click', () => {
            const searchTerm = searchInput.value.toLowerCase();
            resultsContainer.innerHTML = ''; // Clear previous results

            let foundResults = false;

            if (data.beaches) {
                const beachResults = data.beaches.filter(beach =>
                    beach.name.toLowerCase().includes(searchTerm) ||
                    beach.description.toLowerCase().includes(searchTerm)
                );
                if (beachResults.length > 0) {
                    foundResults = true;
                    beachResults.slice(0, 2).forEach(beach => {
                        resultsContainer.innerHTML += `<div><img src="${beach.imageUrl}" alt="${beach.name}"><p><strong>${beach.name}</strong></p><p>${beach.description}</p></div>`;
                    });
                } else if (searchTerm.includes('beach')) {
                    resultsContainer.innerHTML += '<p>No beach recommendations found for your search.</p>';
                }
            }

            if (data.temples) {
                const templeResults = data.temples.filter(temple =>
                    temple.name.toLowerCase().includes(searchTerm) ||
                    temple.description.toLowerCase().includes(searchTerm)
                );
                if (templeResults.length > 0) {
                    foundResults = true;
                    templeResults.slice(0, 2).forEach(temple => {
                        resultsContainer.innerHTML += `<div><img src="${temple.imageUrl}" alt="${temple.name}"><p><strong>${temple.name}</strong></p><p>${temple.description}</p></div>`;
                    });
                } else if (searchTerm.includes('temple')) {
                    resultsContainer.innerHTML += '<p>No temple recommendations found for your search.</p>';
                }
            }

            if (data.countries) {
                const countryResults = data.countries.filter(country =>
                    country.name.toLowerCase().includes(searchTerm) ||
                    country.description.toLowerCase().includes(searchTerm)
                );
                if (countryResults.length > 0) {
                    foundResults = true;
                    countryResults.slice(0, 2).forEach(country => {
                        resultsContainer.innerHTML += `<div><img src="${country.imageUrl}" alt="${country.name}"><p><strong>${country.name}</strong></p><p>${country.description}</p></div>`;
                    });
                } else if (searchTerm.includes('country')) {
                    resultsContainer.innerHTML += '<p>No country recommendations found for your search.</p>';
                }
            }

            if (!searchTerm) {
                resultsContainer.innerHTML = '<p>Enter a keyword to search for recommendations.</p>';
            } else if (!foundResults && searchTerm && !searchTerm.includes('beach') && !searchTerm.includes('temple') && !searchTerm.includes('country')) {
                resultsContainer.innerHTML = '<p>No recommendations found for your search.</p>';
            }
        });

        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            resultsContainer.innerHTML = '<p>Enter a keyword to search for recommendations.</p>';
        });

        // Initial message when the page loads
        resultsContainer.innerHTML = '<p>Enter a keyword to search for recommendations.</p>';

    })
    .catch(error => {
        console.error("Error fetching data:", error);
        resultsContainer.innerHTML = '<p>Failed to load recommendations.</p>';
    });
