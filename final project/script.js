document.addEventListener("DOMContentLoaded", () => {
    console.log("Travel Guide Loaded!");

    // Example of LocalStorage usage
    const visitCount = localStorage.getItem("visitCount") || 0;
    localStorage.setItem("visitCount", Number(visitCount) + 1);
    console.log(`You have visited this site ${localStorage.getItem("visitCount")} times.`);
});
