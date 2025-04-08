document.addEventListener("DOMContentLoaded", async () => {
    const discoverContainer = document.getElementById("discover-container");

    try {
        const response = await fetch("./data/items.json"); // Caminho atualizado
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
