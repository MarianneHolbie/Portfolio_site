// main.js - Script principal pour le site de Marianne Arrue
document.addEventListener('DOMContentLoaded', function() {
    // ----- NAVIGATION -----

    // Menu mobile
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    if (mobileMenuButton) {
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu hidden fixed top-16 left-0 right-0 bg-white shadow-lg p-4 z-50';

        // Créer les liens du menu mobile
        const links = [
            { text: 'Parcours', href: '#parcours' },
            { text: 'Expertise', href: '#expertise' },
            { text: 'Projets', href: '#projets' },
            { text: 'Blog', href: '#blog' },
            { text: 'Contact', href: '#contact', class: 'px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 block text-center mt-2' }
        ];

        const navList = document.createElement('div');
        navList.className = 'flex flex-col space-y-3';

        links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.textContent = link.text;
            a.className = link.class || 'text-gray-700 hover:text-indigo-600 block';
            navList.appendChild(a);
        });

        mobileMenu.appendChild(navList);
        document.body.appendChild(mobileMenu);

        // Toggle menu
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Fermer le menu en cliquant sur un lien
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });

        // Fermer le menu en cliquant en dehors
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // ----- SCROLL FLUIDE -----

    // Défilement fluide pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Ne rien faire si c'est juste "#"
            if (targetId === '#') return;

            e.preventDefault();
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calcul de l'offset pour tenir compte de la barre de navigation fixe
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ----- ANIMATIONS -----

    // Effet de survol pour les liens dans la navigation
    document.querySelectorAll('.animated-underline').forEach(link => {
        link.addEventListener('mouseenter', function() {
            const underline = this.querySelector('::after');
            if (underline) {
                underline.style.width = '100%';
            }
        });

        link.addEventListener('mouseleave', function() {
            const underline = this.querySelector('::after');
            if (underline) {
                underline.style.width = '0';
            }
        });
    });

    // ----- CAROUSEL -----

    // Gestion du carousel
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselDots = document.querySelectorAll('.carousel-dot');

    if (carouselSlides.length > 0 && carouselDots.length > 0) {
        let currentSlide = 0;
        let autoplayInterval;

        function showSlide(index) {
            // Masquer toutes les slides
            carouselSlides.forEach(slide => slide.classList.remove('active'));
            carouselDots.forEach(dot => dot.classList.remove('active'));

            // Afficher la slide sélectionnée
            carouselSlides[index].classList.add('active');
            carouselDots[index].classList.add('active');
            currentSlide = index;
        }

        // Navigation par les points
        carouselDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                // Réinitialiser l'intervalle d'autoplay
                if (autoplayInterval) {
                    clearInterval(autoplayInterval);
                    startAutoplay();
                }
            });
        });

        // Autoplay
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % carouselSlides.length;
                showSlide(currentSlide);
            }, 4000); // Réduit à 4 secondes au lieu de 5
        }

        // Démarrer l'autoplay
        startAutoplay();

        // Pause autoplay on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(autoplayInterval);
            });

            carouselContainer.addEventListener('mouseleave', () => {
                startAutoplay();
            });
        }
    }



    // ----- ANIMATION AU SCROLL -----

    // Animation des éléments au scroll
    const animatedElements = document.querySelectorAll('.card-hover, .blog-card, .timeline-item');

    // Observer pour les animations au scroll
    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -100px 0px"
        };

        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            });
        }, appearOptions);

        animatedElements.forEach(element => {
            element.classList.add('opacity-0', 'translate-y-4', 'transition', 'duration-500');
            appearOnScroll.observe(element);
        });

        // Ajout d'une classe CSS pour l'animation
        const style = document.createElement('style');
        style.textContent = `
      .appear {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
        document.head.appendChild(style);
    }

    // ----- EFFET DE PARALLAXE -----

    // Effet subtil de parallaxe sur la section hero
    const heroSection = document.querySelector('.hero-gradient');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            if (scrollTop < heroSection.offsetHeight) {
                const heroContent = heroSection.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrollTop * 0.3}px)`;
                }
            }
        });
    }

    // ----- GESTION DES IMAGES -----

    // Chargement paresseux des images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    console.log('✨ Scripts initialisés avec succès - Site de Marianne Arrue');
});
