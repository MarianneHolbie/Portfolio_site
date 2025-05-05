document.addEventListener('DOMContentLoaded', function() {
    // Suivi des clics sur les liens de projets
    document.querySelectorAll('a[href*="vocabulolp.vercel.app"]').forEach(function(link) {
        link.addEventListener('click', function() {
            if (typeof umami !== 'undefined') {
                umami.trackEvent('projet-click', {
                    nom: this.closest('.card-hover').querySelector('h3').innerText.trim()
                });
            }
        });
    });

    // Suivi du formulaire de contact
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (typeof umami !== 'undefined') {
                umami.trackEvent('formulaire-contact-soumis');
            }
        });
    }

    // Suivi des clics sur Calendly
    document.querySelectorAll('a[href*="calendly.com"]').forEach(function(link) {
        link.addEventListener('click', function() {
            if (typeof umami !== 'undefined') {
                umami.trackEvent('reservation-calendly-click');
            }
        });
    });

    // Suivi des clics sur LinkedIn
    document.querySelectorAll('a[href*="linkedin.com"]').forEach(function(link) {
        link.addEventListener('click', function() {
            if (typeof umami !== 'undefined') {
                umami.trackEvent('linkedin-click', {
                    section: getParentSectionId(this)
                });
            }
        });
    });

    // Suivi de la navigation dans le menu
    document.querySelectorAll('nav a').forEach(function(link) {
        link.addEventListener('click', function() {
            if (typeof umami !== 'undefined') {
                umami.trackEvent('navigation-click', {
                    destination: this.innerText.trim()
                });
            }
        });
    });

    // Fonction utilitaire pour obtenir l'ID de section parent
    function getParentSectionId(element) {
        let parent = element.parentElement;
        while (parent && parent.id === '') {
            parent = parent.parentElement;
        }
        return parent ? parent.id : 'unknown';
    }
});
