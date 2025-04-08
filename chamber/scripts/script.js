document.addEventListener("DOMContentLoaded", () => {
    // ** Atualização de Ano e Última Modificação **
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

    // ** Atualizar Previsão do Tempo **
    const apiKey = "YOUR_API_KEY"; // Substitua pela sua chave da API OpenWeatherMap
    const city = "Faro";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("current-temp").textContent = `${Math.round(data.list[0].main.temp)}°C`;
            document.getElementById("weather-desc").textContent = capitalizeWords(data.list[0].weather[0].description);

            // Previsão para os próximos 3 dias
            for (let i = 1; i <= 3; i++) {
                document.getElementById(`day${i}-forecast`).textContent = `${Math.round(data.list[i * 8].main.temp)}°C`;
            }
        })
        .catch(error => console.error("Erro ao buscar previsão do tempo:", error));

    // ** Exibir Membros Destaque **
    const spotlightContainer = document.getElementById("spotlights-container");

    fetch("data/members.json")
        .then(response => response.json())
        .then(members => {
            const goldSilverMembers = members.filter(member => [2, 3].includes(member.membership));
            const selected = goldSilverMembers.sort(() => Math.random() - 0.5).slice(0, 3);

            spotlightContainer.innerHTML = selected.map(member => `
                <div class="spotlight-card">
                    <img src="${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                </div>
            `).join("");
        })
        .catch(error => console.error("Erro ao carregar membros destaque:", error));

    // ** Captura o Timestamp **
    document.getElementById("timestamp").value = new Date().toISOString();

    // ** Funções para abrir e fechar Modais **
    window.showModal = (id) => document.getElementById(id).style.display = "block";
    window.closeModal = (id) => document.getElementById(id).style.display = "none";

    // ** Exibir mensagem de visita usando localStorage **
    const visitMessage = document.getElementById("visit-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    visitMessage.textContent = !lastVisit
        ? "Welcome! Let us know if you have any questions."
        : Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24)) < 1
            ? "Back so soon! Awesome!"
            : `You last visited ${Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24))} day${Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24)) > 1 ? "s" : ""} ago.`;

    localStorage.setItem("lastVisit", now);

    // ** Carregar Locais do `discover.html` **
    const discoverContainer = document.getElementById("discover-container");

    fetch("data/items.json")
        .then(response => response.json())
        .then(locations => {
            discoverContainer.innerHTML = locations.map(location => `
                <div class="discover-card">
                    <h2>${location.name}</h2>
                    <figure>
                        <img src="${location.image}" alt="${location.name}">
                    </figure>
                    <address>${location.address}</address>
                    <p>${location.description}</p>
                    <button>Learn More</button>
                </div>
            `).join("");
        })
        .catch(error => console.error("Erro ao carregar locais:", error));
});

// ** Função para capitalizar palavras **
const capitalizeWords = (str) =>
    str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("discover-container");

    try {
        const response = await fetch("data/items.json"); // Verifique se o caminho está correto
        if (!response.ok) throw new Error("Erro ao carregar JSON");

        const locations = await response.json();

        locations.forEach(location => {
            const card = document.createElement("div");
            card.classList.add("discover-card");

            card.innerHTML = `
                <h2>${location.name}</h2>
                <figure>
                    <img src="${location.image}" alt="${location.name}">
                </figure>
                <address>${location.address}</address>
                <p>${location.description}</p>
                <button>Learn More</button>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Erro ao carregar locais:", error);
        container.innerHTML = `<p>Erro ao carregar os dados. Verifique o JSON.</p>`;
    }
});
