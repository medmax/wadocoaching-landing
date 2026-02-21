// ── Intégration Calendly — popup au clic ──
var CALENDLY_URL = 'https://calendly.com/mehdi-soudsane/30min';

function openCalendlyPopup(e) {
    e.preventDefault();
    e.stopPropagation();

    if (typeof Calendly !== 'undefined') {
        Calendly.initPopupWidget({
            url: CALENDLY_URL,
            pageSettings: {
                backgroundColor: 'ffffff',
                primaryColor:    '1ABAEA',
                textColor:       '152034'
            }
        });
    } else {
        // Fallback si le widget Calendly n'est pas chargé
        window.open(CALENDLY_URL, '_blank');
    }

    // Ferme le menu mobile si ouvert
    var navMenu = document.getElementById('navMenu');
    var burger  = document.getElementById('burger');
    if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
    }
}

document.querySelectorAll('[data-calendly-popup]').forEach(function(btn) {
    btn.addEventListener('click', openCalendlyPopup);
});
