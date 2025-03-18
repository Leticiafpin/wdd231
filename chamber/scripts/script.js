document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('members-container');
    const gridViewBtn = document.getElementById('gridView');
    const listViewBtn = document.getElementById('listView');
    const yearElement = document.getElementById('year');
    const lastModifiedElement = document.getElementById('lastModified');

    // Atualiza o ano e última modificação
    yearElement.textContent = new Date().getFullYear();
    lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;

    // Fetch JSON data
    const response = await fetch('data/members.json');
    const members = await response.json();

    // Render members
    const renderMembers = (view) => {
        container.innerHTML = '';
        container.className = view;

        members.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.classList.add('member');

            memberDiv.innerHTML = `
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;

            container.appendChild(memberDiv);
        });
    };

    // Event listeners for view toggles
    gridViewBtn.addEventListener('click', () => renderMembers('grid'));
    listViewBtn.addEventListener('click', () => renderMembers('list'));

    // Default view
    renderMembers('grid');
});


const apiKey = "YOUR_API_KEY"; // Replace with OpenWeatherMap API Key
const city = "Timbuktu";
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

document.addEventListener("DOMContentLoaded", () => {
    const tempElement = document.getElementById("current-temp");
    const descElement = document.getElementById("weather-desc");
    const forecast = document.getElementById("forecast");

    fetch(weatherUrl)
        .then((response) => response.json())
        .then((data) => {
            tempElement.textContent = `Temperature: ${Math.round(data.list[0].main.temp)}°C`;
            descElement.textContent = `Description: ${data.list[0].weather.map(w => w.description).join(", ")}`;

            // Format forecast
            for (let i = 1; i <= 3; i++) {
                document.getElementById(`day${i}`).textContent = `${Math.round(data.list[i * 8].main.temp)}°C`;
            }
        })
        .catch((error) => console.error("Error fetching weather data:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const spotlightContainer = document.getElementById("spotlights-container");

    fetch("data/members.json")
        .then((response) => response.json())
        .then((members) => {
            const goldSilverMembers = members.filter(member => member.membership === 2 || member.membership === 3);
            const selectedMembers = goldSilverMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

            selectedMembers.forEach(member => {
                const card = document.createElement("div");
                card.classList.add("spotlight-card");

                card.innerHTML = `
                    <img src="${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                `;

                spotlightContainer.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching member spotlights:", error));
});
