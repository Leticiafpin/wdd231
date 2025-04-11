document.addEventListener("DOMContentLoaded", () => {
    // Exemplo de log de carregamento
    console.log("Travel Guide Loaded!");
  
    // Exemplo de uso do localStorage para contar visitas
    const visitCount = localStorage.getItem("visitCount") || 0;
    localStorage.setItem("visitCount", Number(visitCount) + 1);
    console.log(`You have visited this site ${localStorage.getItem("visitCount")} times.`);
  
    // Modal functionality (opcional)
    const modal = document.querySelector(".modal");
    const openModal = document.querySelector(".open-modal");
    const closeModal = document.querySelector(".close-modal");
  
    if (openModal && closeModal && modal) {
      openModal.addEventListener("click", () => {
        modal.style.display = "block";
      });
  
      closeModal.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }
  });
  