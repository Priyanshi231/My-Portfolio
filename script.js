document.addEventListener('DOMContentLoaded', function() {

    // --- Core UI & Navigation Logic ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    const backToTopButton = document.querySelector('.back-to-top');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        backToTopButton.classList.toggle('visible', window.scrollY > 300);
    });
    
    // --- Intersection Observer for Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // --- Active Nav Link Highlighting ---
    const sections = document.querySelectorAll('main section[id]');
    function navHighlighter() {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            let sectionId = current.getAttribute('id');
            const navLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
            if (navLink) {
                navLink.classList.toggle('active', scrollY > sectionTop && scrollY <= sectionTop + sectionHeight);
            }
        });
    }
    window.addEventListener('scroll', navHighlighter);

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        formMessage.textContent = 'Thank you for your message! I will get back to you shortly.';
        formMessage.style.color = 'var(--accent-secondary)';
        contactForm.reset();
        setTimeout(() => { formMessage.textContent = ''; }, 5000);
    });

    // --- Dynamic Footer Time ---
    const locationTimeElement = document.getElementById('location-time');
    function updateFooterInfo() {
        const now = new Date();
        const options = { timeZone: 'Asia/Kolkata', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
        locationTimeElement.innerHTML = `Indore, India &bull; ${now.toLocaleString('en-US', options)}`;
    }
    updateFooterInfo();
    setInterval(updateFooterInfo, 1000);

});