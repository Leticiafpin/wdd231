document.addEventListener("DOMContentLoaded", () => {
    // ** Atualização de Ano e Última Modificação **
    const yearElement = document.getElementById("year");
    const lastModifiedElement = document.getElementById("lastModified");
    yearElement.textContent = new Date().getFullYear();
    lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;

    // ** Função para capitalizar palavras **
    const capitalizeWords = (str) =>
        str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    // ** Atualizar Previsão do Tempo **
    const apiKey = "YOUR_API_KEY"; // Substitua pela sua chave da API OpenWeatherMap
    const city = "Faro";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            // Atualiza dados do clima atual
            document.getElementById("current-temp").textContent = `${Math.round(data.list[0].main.temp)}°C`;
            document.getElementById("weather-desc").textContent = capitalizeWords(data.list[0].weather[0].description);

            // Previsão para 3 dias
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
            // Filtra membros Gold (3) e Silver (2)
            const goldSilverMembers = members.filter(member => member.membership === 2 || member.membership === 3);

            // Seleciona 2 ou 3 membros aleatoriamente
            const selected = goldSilverMembers.sort(() => Math.random() - 0.5).slice(0, 3);

            // Renderiza cada cartão
            selected.forEach(member => {
                const card = `
                    <div class="spotlight-card">
                        <img src="${member.image}" alt="${member.name}">
                        <h3>${member.name}</h3>
                        <p>${member.address}</p>
                        <p>${member.phone}</p>
                        <a href="${member.website}" target="_blank">Visit Website</a>
                    </div>`;
                spotlightContainer.innerHTML += card;
            });
        })
        .catch(error => console.error("Erro ao carregar membros destaque:", error));
});


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("timestamp").value = new Date().toISOString();

    window.showModal = function(id) {
        document.getElementById(id).style.display = "block";
    };

    window.closeModal = function(id) {
        document.getElementById(id).style.display = "none";
    };
});
