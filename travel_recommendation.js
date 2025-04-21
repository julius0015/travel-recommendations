// travel_recommendation.js
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const resultsContainer = document.getElementById('resultsContainer');

// Mapping of location names to their primary time zones (you might need to expand this)
const locationTimeZones = {
    "Sunset Serenity Beach, Bali": "Asia/Denpasar",
    "Turquoise Waters of Maya Bay, Thailand": "Asia/Bangkok",
    "Whitehaven Beach, Australia": "Australia/Sydney",
    "Bora Bora, French Polynesia": "Pacific/Tahiti",
    "Maldives": "Indian/Maldives",
    "Navagio Beach (Shipwreck Beach), Greece": "Europe/Athens",
    "Pink Sands Beach, Bahamas": "America/Nassau",
    "Railay Beach, Thailand": "Asia/Bangkok",
    "Anse Source d'Argent, Seychelles": "Indian/Mahe",
    "Cannon Beach, USA": "America/Los_Angeles",
    "Angkor Wat, Cambodia": "Asia/Phnom_Penh",
    "Fushimi Inari-taisha Shrine, Japan": "Asia/Tokyo",
    "Borobudur Temple, Indonesia": "Asia/Jakarta",
    "Sistine Chapel, Vatican City": "Europe/Vatican",
    "Sheikh Zayed Mosque, Abu Dhabi, UAE": "Asia/Dubai",
    "Lotus Temple, India": "Asia/Kolkata",
    "Wat Arun Ratchawararam Ratchawaramahawihan, Thailand": "Asia/Bangkok",
    "Meiji Jingu Shrine, Japan": "Asia/Tokyo",
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

function formatDateTime(timeZone) {
    try {
        const options = {
            timeZone: timeZone,
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        return new Date().toLocaleDateString('en-US', options) + ' - ' + new Date().toLocaleTimeString('en-US', options);
    } catch (error) {
        console.error(`Error getting date and time for ${timeZone}:`, error);
        return "Date and time unavailable";
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
                        const timeZone = locationTimeZones[beach.name];
                        const currentDateTime = timeZone ? formatDateTime(timeZone) : 'Date and time unavailable';
                        resultsContainer.innerHTML += `<div><img src="${beach.imageUrl}" alt="${beach.name}"><p><strong>${beach.name}</strong></p><p>${beach.description}</p><p>Current date and time: ${currentDateTime}</p></div>`;
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
                        const timeZone = locationTimeZones[temple.name];
                        const currentDateTime = timeZone ? formatDateTime(timeZone) : 'Date and time unavailable';
                        resultsContainer.innerHTML += `<div><img src="${temple.imageUrl}" alt="${temple.name}"><p><strong>${temple.name}</strong></p><p>${temple.description}</p><p>Current date and time: ${currentDateTime}</p></div>`;
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
                        const timeZone = locationTimeZones[country.name];
                        const currentDateTime = timeZone ? formatDateTime(timeZone) : 'Date and time unavailable';
                        resultsContainer.innerHTML += `<div><img src="${country.imageUrl}" alt="${country.name}"><p><strong>${country.name}</strong></p><p>${country.description}</p><p>Current date and time: ${currentDateTime}</p></div>`;
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
