const apiUrl = 'http://localhost:3000/api/cat'; // Updated endpoint

async function fetchCatData() {
    try {
        const response = await fetch(apiUrl + '/persian');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const catData = await response.json();
        displayCatData(catData);
    } catch (error) {
        console.error('Error fetching cat data:', error);
    }
}



function displayCatData(catData) {
    const catContainer = document.getElementById('cat-container');
  
    // Create HTML content
    const catHTML = `
      <div>
        <img id="imgSize" src="${catData.image}" alt="${catData.name}">
        <h2>${catData.name}</h2>
        <p>Hair: ${catData.hair}</p>
        <p>life Span: ${catData.lifespan}</p>
        <!-- Add more properties as needed -->
      </div>
    `;
  
    // Append HTML to the container
    catContainer.innerHTML = catHTML;
}
fetchCatData();
