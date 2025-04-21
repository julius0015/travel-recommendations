// travel_recommendation.js
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const resultsContainer = document.getElementById('resultsContainer');

// Mapping of country names to their primary time zones (you might need to expand this)
const countryTimeZones = {
    "Italy": "Europe/Rome",
    "Japan": "Asia/Tokyo",
    "Peru": "America/Lima",
    "France": "Europe/Paris",
    "Canada": "America/Toronto", // Or another major city
    "Egypt": "Africa/Cairo",
    "South Africa": "Africa/Johannesburg",
    "Brazil": "America/Sao_Paulo",
    "New Zealand": "Pacific/Auckland",
    "Greece": "Europe/Athens",
    "China": "Asia/Shanghai",
    "United Kingdom": "Europe/London",
    "Mexico": "America/Mexico_City",
    "Turkey": "Europe/Istanbul",
    "Ireland": "Europe/Dublin",
    "Australia": "Australia/Sydney",
    "India": "Asia/Kolkata",
    "Iceland": "Atlantic/Reykjavik",
    "Morocco": "Africa/Casablanca",
    "Thailand": "Asia/Bangkok",
    "Costa Rica": "America/Costa_Rica",
    "Scotland": "Europe/London", // Scotland uses the same time zone as London for the most part
    "Vietnam": "Asia/Ho_Chi_Minh"
};

function formatTime(timeZone) {
    try {
        const options = {
            timeZone: timeZone,
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        return new Date().toLocaleTimeString('en-US', options);
    } catch (error) {
        console.error(`Error getting time for ${timeZone}:`, error);
        return "Time unavailable";
    }
}

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
                        const timeZone = countryTimeZones[country.name];
                        const currentTime = timeZone ? formatTime(timeZone) : 'Time zone not available';
                        resultsContainer.innerHTML += `<div><img src="${country.imageUrl}" alt="${country.name}"><p><strong>${country.name}</strong></p><p>${country.description}</p><p>Current time: ${currentTime}</p></div>`;
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
