/* === SCRIPT.JS === */
/* Ce fichier gère les interactions (clics, scroll, etc.) */


/* -----------------------------------------------
   1. MENU BURGER
   -----------------------------------------------
   Quand on clique sur le burger :
   - On ajoute la classe "active" au burger (→ les 3 traits deviennent ×)
   - On ajoute la classe "open" au menu (→ le menu slide depuis la droite)
   Quand on clique sur un lien du menu :
   - On ferme le menu
*/

// document.getElementById() → cherche dans le HTML l'élément avec cet id
// C'est comme ça qu'on "attrape" un élément HTML en JS
const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');

// addEventListener('click', ...) → "quand on CLIQUE sur cet élément, fais ça"
burger.addEventListener('click', function() {

    // classList.toggle('active') :
    // - Si la classe "active" N'EST PAS là → il l'AJOUTE
    // - Si la classe "active" EST là → il l'ENLÈVE
    // C'est un interrupteur on/off !
    burger.classList.toggle('active');
    navMenu.classList.toggle('open');
});

// Fermer le menu quand on clique sur un lien
// querySelectorAll('.nav-link') → sélectionne TOUS les éléments avec cette classe
// forEach() → fait quelque chose pour CHACUN d'entre eux
navMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
        // .remove() → enlève la classe (ne toggle pas, ENLÈVE à coup sûr)
        burger.classList.remove('active');
        navMenu.classList.remove('open');
    });
});