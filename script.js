document.addEventListener('DOMContentLoaded', function() {

    // --- Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .timeline-dot');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseover', () => cursorOutline.classList.add('grow'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('grow'));
    });

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
    
    // --- Theme Switcher ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'light-mode') {
            themeToggle.checked = true;
        }
    }
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    // --- Dynamic Typing Animation for Hero ---
    const dynamicText = document.getElementById('dynamic-text');
    if (dynamicText) {
        const roles = ["Software Developer", "AI Enthusiast", "Problem Solver"];
        let roleIndex = 0;
        function updateRole() {
            dynamicText.style.opacity = '0';
            setTimeout(() => {
                roleIndex = (roleIndex + 1) % roles.length;
                dynamicText.textContent = roles[roleIndex];
                dynamicText.style.opacity = '1';
            }, 500);
        }
        dynamicText.textContent = roles[roleIndex];
        setInterval(updateRole, 3000);
    }
    
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
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
            if (navLink) {
                navLink.classList.toggle('active', scrollY > sectionTop && scrollY <= sectionTop + sectionHeight);
            }
        });
    }
    window.addEventListener('scroll', navHighlighter);

    // --- Project Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // --- Contact Form Live Validation & Interaction ---
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const typingIndicator = document.querySelector('.typing-indicator');
    
    function validate(field, regex) {
        const parent = field.parentElement;
        if (regex.test(field.value)) {
            parent.classList.add('valid');
            parent.classList.remove('invalid');
        } else {
            parent.classList.add('invalid');
            parent.classList.remove('valid');
        }
    }
    nameInput.addEventListener('input', () => validate(nameInput, /.+/));
    emailInput.addEventListener('input', () => validate(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/));

    messageInput.addEventListener('input', () => {
        typingIndicator.classList.toggle('visible', messageInput.value.length > 0);
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formMessage = document.getElementById('form-message');
        formMessage.textContent = 'Thank you! Your message has been sent.';
        formMessage.style.color = 'var(--accent-secondary)';
        contactForm.reset();
        document.querySelectorAll('.form-group').forEach(fg => fg.classList.remove('valid', 'invalid'));
        typingIndicator.classList.remove('visible');
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