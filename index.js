document.title = "Lounashaku"; // Set page title

// Metropolia Myllypuro Sodexo ID 65

let kitchenData; // Variable where the information about each kitchen will be saved

const urlKitchen = "https://kitchen.kanttiinit.fi/restaurants?lang=fi"; // Url base
let modUrl = urlKitchen + "&ids=1,2,3&priceCategories=student"; // Modified url for the testing use case

const proxyUrl = 'https://corsproxy.io/?'; // CORS Proxy address

const container = document.getElementById('restaurants-container'); // Container for restaurant info
const searchOtaniemiBtn = document.getElementById("searchOtaniemi"); // Button for searching restaurants in Otaniemi
const searchMyllypuroBtn = document.getElementById("searchMyllypuro"); // Button for searching the Myllypuro restaurant

let otaUrl = urlKitchen + "&ids=1,2,3,5,7,8,41,45,50,51,52,59,64&priceCategories=student"; // Url for Otaniemi
let myllyUrl = urlKitchen + "&ids=65&priceCategories=student,studentPremium"; // Url for Myllypuro

//searchOtaniemiBtn.setAttribute(onclick, fetchKitchens(otaUrl));
//searchMyllypuroBtn.setAttribute(onclick, fetchKitchens(myllyUrl));

// Fetch request, written by our lord and saviour, Chat GPT
function fetchKitchens (areaSpecificUrl) {
    container.innerHTML = "";

    fetch(proxyUrl + areaSpecificUrl, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    })
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        kitchenData=data;
        displayDataOnPage(); // Run function for displaying the data on the webpage
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}
  

  function displayDataOnPage() {
    // Iterate through the fetched data and append information to the output div
    kitchenData.forEach(item => {
      const listItem = document.createElement('p');
      listItem.textContent = `ID: ${item.id}, Nimi: ${item.name}, Hintaluokka: ${item.priceCategory}`;
      container.appendChild(listItem);
    });
  }