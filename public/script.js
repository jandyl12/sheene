document.addEventListener('DOMContentLoaded', function() {

    // --- Theme (Light/Dark Mode) Toggler ---
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const body = document.body;
    const themeIcon = themeToggleButton ? themeToggleButton.querySelector('i') : null;

    const applySavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (!themeIcon) return;
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            body.classList.remove('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    };

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                localStorage.setItem('theme', 'light');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        });
    }
    applySavedTheme();

    // --- Interactive Header on Scroll (for Homepage) ---
    const header = document.getElementById('main-header');
    if (header && !header.classList.contains('header-static')) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('header-scrolled', window.scrollY > 50);
        });
    }

    // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.main-nav');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-active');
            const icon = hamburger.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // --- Accordion Functionality ---
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            header.nextElementSibling.classList.toggle('open');
        });
    });
    
    // --- Testimonial Slider ---
    document.querySelectorAll('.testimonial-carousel').forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        if (!track) return;
        const slides = Array.from(track.children);
        const nextButton = carousel.querySelector('.next');
        const prevButton = carousel.querySelector('.prev');
        let currentIndex = 0;
        const updateSlidePosition = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        };
        if (nextButton) nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlidePosition();
        });
        if (prevButton) prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlidePosition();
        });
    });

    // --- 3D Photo Gallery Slider ---
    document.querySelectorAll('.gallery-slider-container').forEach(sliderContainer => {
        const slides = sliderContainer.querySelectorAll('.gallery-slide-3d');
        const nextButton = sliderContainer.querySelector('.next-3d');
        const prevButton = sliderContainer.querySelector('.prev-3d');
        if (slides.length === 0) return;
        let currentIndex = 0;
        const totalSlides = slides.length;

        const updateSlideClasses = () => {
            slides.forEach((slide, index) => {
                slide.classList.remove('active', 'prev', 'next');
                if (index === currentIndex) {
                    slide.classList.add('active');
                } else if (index === (currentIndex - 1 + totalSlides) % totalSlides) {
                    slide.classList.add('prev');
                } else if (index === (currentIndex + 1) % totalSlides) {
                    slide.classList.add('next');
                }
            });
        };
        if (nextButton) nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlideClasses();
        });
        if (prevButton) prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlideClasses();
        });
        updateSlideClasses();
    });

    // --- Image Lightbox Functionality ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryImages = document.querySelectorAll('.gallery-slide-3d img, .img-wrapper img');

    if (lightbox && lightboxImg && lightboxClose && galleryImages.length > 0) {
        galleryImages.forEach(image => {
            image.addEventListener('click', () => {
                lightbox.style.display = 'block';
                lightboxImg.src = image.src;
                body.classList.add('lightbox-open');
            });
        });

        const closeLightbox = () => {
            lightbox.style.display = 'none';
            body.classList.remove('lightbox-open');
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // --- Scroll Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(elem => { revealObserver.observe(elem); });

    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            backToTopButton.classList.toggle('show', window.scrollY > 300);
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});