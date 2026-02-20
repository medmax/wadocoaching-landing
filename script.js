/* === SCRIPT.JS === */

/* --- BURGER MENU --- */
const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');

burger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    burger.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
});

/* Ferme le menu quand on clique sur un lien */
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
    });
});
