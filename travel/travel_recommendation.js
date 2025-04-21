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
        const options = { timeZone: country.timezone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const countryTime = new Date().toLocaleTimeString('en-US', options);
            resultsContainer.innerHTML += `<div><img src="<span class="math-inline">\{country\.imageUrl\}" alt\="</span>{country.name}"><p><strong><span class="math-inline">\{country\.name\}</strong\></p\><p\></span>{country.description}</p><p>Current Time: ${countryTime}</p></div>`;
        });
    } else if (searchTerm) {
        resultsContainer.innerHTML = '<p>No recommendations found for your search.</p>';
    }
    });

    const clearBtn = document.getElementById('clearBtn');
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        resultsContainer.innerHTML = ''; // Clear the displayed recommendations
    });

    .catch(error => {
        console.error("Error fetching data:", error);
    });
