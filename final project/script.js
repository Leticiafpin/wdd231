document.addEventListener("DOMContentLoaded", () => {
    console.log("Travel Guide Loaded!");

    // Modal functionality
    const modal = document.querySelector(".modal");
    const openModal = document.querySelector(".open-modal");
    const closeModal = document.querySelector(".close-modal");

    openModal.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // LocalStorage Example
    const visitCount = localStorage.getItem("visitCount") || 0;
    localStorage.setItem("visitCount", Number(visitCount) + 1);
    console.log(`You have visited this site ${localStorage.getItem("visitCount")} times.`);
});
