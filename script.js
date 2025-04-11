// Intersection Observer for section animations
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Scroll to top button
const scrollTopButton = document.querySelector('.scroll-top');
const scrollThreshold = 300;

window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile menu toggle
const navLinks = document.querySelector('.nav-links');
const menuButton = document.createElement('button');
menuButton.className = 'menu-toggle';
menuButton.setAttribute('aria-label', 'Toggle menu');
menuButton.innerHTML = '☰';

document.querySelector('nav').prepend(menuButton);

menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuButton.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuButton.innerHTML = '☰';
    }
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            contactForm.reset();
            alert('Message sent successfully!');
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        alert('Error sending message. Please try again.');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const thankYou = document.getElementById("thank-you");

    window.addEventListener("scroll", function () {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
            thankYou.classList.add("show");
        } else {
            thankYou.classList.remove("show");
        }
    });
});


