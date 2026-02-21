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

}

// Event delegation — compatible avec le rendu asynchrone de Vue
document.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-calendly-popup]');
    if (!btn) return;
    openCalendlyPopup(e);
});
