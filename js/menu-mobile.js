const menuToggle = document.getElementById("menu-toggle");
const menuMobile = document.getElementById("menu-mobile");
const closeMenu = document.getElementById("close-menu");

menuToggle.addEventListener("click", () => {
    menuMobile.classList.add("active");
});

closeMenu.addEventListener("click", () => {
    menuMobile.classList.remove("active");
});