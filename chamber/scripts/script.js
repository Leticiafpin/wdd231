document.addEventListener("DOMContentLoaded", async () => {
    // ** Atualização de Ano e Última Modificação **
    const yearElement = document.getElementById("year");
    const lastModifiedElement = document.getElementById("lastModified");

    if (yearElement) yearElement.textContent = new Date().getFullYear();
    if (lastModifiedElement) lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;

    // ** Função para capitalizar palavras **
    const capitalizeWords = (str) =>
        str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    // ** Atualizar Previsão do Tempo **
    const apiKey = "YOUR_API_KEY"; // Substitua pela sua chave da API OpenWeatherMap
    const city = "Faro";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) throw new Error("Erro ao carregar dados do clima.");
        const weatherData = await weatherResponse.json();

        const tempElement = document.getElementById("current-temp");
        const descElement = document.getElementById("weather-desc");

        if (tempElement) tempElement.textContent = `${Math.round(weatherData.list[0].main.temp)}°C`;
        if (descElement) descElement.textContent = capitalizeWords(weatherData.list[0].weather[0].description);

        // Previsão para os próximos 3 dias (pegando previsão das 12h para cada dia)
        for (let i = 1; i <= 3; i++) {
            const forecastElement = document.getElementById(`day${i}-forecast`);
            if (forecastElement) {
                forecastElement.textContent = `${Math.round(weatherData.list[i * 8].main.temp)}°C`;
            }
        }
    } catch (error) {
        console.error("Erro ao buscar previsão do tempo:", error);
    }

    // ** Exibir Membros Destaque **
    const spotlightContainer = document.getElementById("spotlights-container");

    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error("Erro ao carregar membros.");

        const members = await response.json();
        const goldSilverMembers = members.filter(member => [2, 3].includes(member.membership));
        const selected = goldSilverMembers.sort(() => Math.random() - 0.5).slice(0, 3);

        if (spotlightContainer) {
            spotlightContainer.innerHTML = selected.map(member => `
                <div class="spotlight-card">
                    <img src="${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                </div>
            `).join("");
        }
    } catch (error) {
        console.error("Erro ao carregar membros destaque:", error);
    }

    // ** Captura o Timestamp **
    const timestampElement = document.getElementById("timestamp");
    if (timestampElement) timestampElement.value = new Date().toISOString();

    // ** Funções para abrir e fechar Modais **
    window.showModal = (id) => {
        const modal = document.getElementById(id);
        if (modal) modal.style.display = "block";
    };

    window.closeModal = (id) => {
        const modal = document.getElementById(id);
        if (modal) modal.style.display = "none";
    };

    // ** Exibir mensagem de visita usando localStorage **
    const visitMessageElement = document.getElementById("visit-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (visitMessageElement) {
        visitMessageElement.textContent = !lastVisit
            ? "Welcome! Let us know if you have any questions."
            : Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24)) < 1
                ? "Back so soon! Awesome!"
                : `You last visited ${Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24))} day${Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24)) > 1 ? "s" : ""} ago.`;
    }

    localStorage.setItem("lastVisit", now);

    // ** Carregar Locais do `discover.html` **
        const discoverContainer = document.getElementById("discover-container");
    
        try {
            const response = await fetch("./data/items.json");
            if (!response.ok) throw new Error("Erro ao carregar locais.");
    
            const locations = await response.json();
    
            if (discoverContainer) {
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
            }
        } catch (error) {
            console.error("Erro ao carregar locais:", error);
            if (discoverContainer) {
                discoverContainer.innerHTML = `<p style="color:red;">Erro ao carregar os dados. Verifique o JSON.</p>`;
            }
        }
    });