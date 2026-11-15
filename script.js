// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initScrollToTop();
    initSmoothScrolling();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initParallaxEffects();
    initTypingEffect();
    initExperienceModal();
    
    // Scroll to Top Button
    function initScrollToTop() {
        const scrollTopBtn = document.querySelector('.scroll-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth Scrolling for Navigation Links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Scroll Animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all sections and cards
        const animatedElements = document.querySelectorAll('.section, .project-card, .skill-category, .contact-section');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Animated Skill Bars
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    progressBar.style.width = '0%';
                    
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 200);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }
    
    // Contact Form Handling
    function initContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault(); // Prevent default form submission
                
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                const formData = new FormData(this);
                
                // Show loading state
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Submit form data to Formspree using fetch
                fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        // Show success message
                        showNotification('Message sent successfully! 🎉', 'success');
                        
                        // Reset form
                        this.reset();
                    } else {
                        // Show error message
                        showNotification('Failed to send message. Please try again.', 'error');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    showNotification('Failed to send message. Please try again.', 'error');
                })
                .finally(() => {
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
            });
        }
    }
    
    // Parallax Effects - Disabled for desktop (water waves animation instead)
    // Mobile handling remains the same
    function initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.profile-container');
        
        // Check if device is mobile (screen width <= 768px)
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // On mobile, keep the image static without any effects
            parallaxElements.forEach(element => {
                element.style.transform = 'none';
            });
            return;
        }
        
        // Desktop: No parallax/floating animation - static image with water waves CSS animation
        parallaxElements.forEach(element => {
            element.style.transform = 'none';
        });
    }
    
    // Typing Effect for Hero Section
    function initTypingEffect() {
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            // Start typing effect after a short delay
            setTimeout(typeWriter, 500);
        }
    }
    
    // Experience detail modal
    function initExperienceModal() {
        const experienceDetails = {
            hadron: {
                role: 'Software Engineer',
                company: 'Hadron GBS',
                projects: [
                    {
                        name: 'ServiceNow Platform \u2014 Administration & ITSM',
                        points: [
                            'Work across platform administration and ITSM processes \u2014 Incident, Problem and Change.',
                            'Configure and customize applications using JavaScript, Business Rules, Script Includes, Client Scripts, UI Policies, UI Actions, ACLs and Notifications.',
                            'Build REST-based integrations, handling authentication, API communication and data synchronization between ServiceNow and external systems.'
                        ],
                        tech: ['ServiceNow', 'ITSM', 'JavaScript', 'GlideRecord', 'REST APIs', 'ACLs']
                    },
                    {
                        name: 'CMDB & CSDM \u2014 Data Foundations',
                        points: [
                            'Work with the Configuration Management Database and Common Service Data Model as a certified Implementation Specialist in Data Foundations.'
                        ],
                        tech: ['CMDB', 'CSDM', 'ServiceNow']
                    }
                ]
            },
            cdi: {
                role: 'Software Developer \u00b7 Nov 2024 \u2013 May 2026 (Trainee from Oct 2024)',
                company: 'ConnectingDots Infotech',
                projects: [
                    {
                        name: 'OTT Streaming Platform \u2014 Subscription-based',
                        points: [
                            'Built and optimized Java Spring Boot backend services for an OTT platform supporting 25K+ active users.',
                            'Designed and implemented secure REST APIs with role-based access control.',
                            'Integrated subscription payment workflows with third-party gateways and Google Play In-App Billing.',
                            'Improved API response time by 20% through query optimization and database indexing.',
                            'Designed a scalable NoSQL data model that improved read performance for content browsing.'
                        ],
                        tech: ['Java', 'Spring Boot 2.7', 'MongoDB', 'Docker', 'Spring Security', 'Google Play Billing']
                    },
                    {
                        name: 'ChottuLink \u2014 Deeplink & Attribution Platform',
                        points: [
                            'Built secure REST APIs and analytics modules with cross-server integration.',
                            'Integrated AWS S3 with presigned URLs for secure file management.',
                            'Developed an MCP (Model Context Protocol) server to automate AI-driven onboarding and user registration.',
                            'Used Docker for deployment and worked on the recurring payments module.'
                        ],
                        tech: ['Java 17', 'Spring Boot', 'MongoDB', 'Docker', 'AWS S3', 'MCP']
                    },
                    {
                        name: 'HariOm App/Web \u2014 Devotional Application',
                        points: [
                            'Developed REST APIs and resolved production bugs.',
                            'Implemented Vishesh Seva and Vishesh Puja flows with proper design and structure.',
                            'Implemented server-side rendering with Thymeleaf for dynamic, backend-driven web views.'
                        ],
                        tech: ['Java', 'Spring Boot', 'REST APIs', 'Thymeleaf']
                    },
                    {
                        name: 'Software Developer Trainee \u2014 Oct\u2013Nov 2024',
                        points: [
                            'Developed RESTful APIs in Spring Boot with full CRUD functionality and role-based authentication via Spring Security.',
                            'Built dynamic web pages with Thymeleaf and added email functionality for notifications.',
                            'Used MongoDB for data storage, focusing on efficient queries to improve performance.'
                        ],
                        tech: ['Spring Boot', 'Spring Security', 'Thymeleaf', 'MongoDB', 'Agile']
                    }
                ]
            },
            amaap: {
                role: 'Back End Developer \u00b7 Mar \u2013 May 2024',
                company: 'Amaap Technologies',
                projects: [
                    {
                        name: 'Microservices & Credit Card Expenditure Tracker',
                        points: [
                            'Built microservices using Spring Boot and Docker, integrating both SQL and NoSQL databases.',
                            'Raised unit test coverage from 70% to 95% using JUnit, Mockito and JaCoCo.',
                            'Built a system to notify users monthly about their credit card expenditure and send spending alerts.',
                            'Applied TDD, clean code principles and design patterns, reducing production defects and improving maintainability.'
                        ],
                        tech: ['Java', 'Spring Boot', 'Docker', 'TDD', 'JUnit', 'Mockito', 'JaCoCo']
                    }
                ]
            }
        };

        const modal = document.getElementById('experience-modal');
        if (!modal) return;

        const modalBody = modal.querySelector('.experience-modal-body');
        const overlay = modal.querySelector('.experience-modal-overlay');
        const closeBtn = modal.querySelector('.experience-modal-close');

        function renderDetails(data) {
            let html = `<h2 id="experience-modal-title">${data.company}</h2><p class="exp-role">${data.role}</p>`;
            data.projects.forEach(project => {
                html += `<div class="exp-project"><h3>${project.name}</h3><ul>`;
                project.points.forEach(point => {
                    html += `<li>${point}</li>`;
                });
                html += '</ul><div class="exp-tech">';
                project.tech.forEach(t => {
                    html += `<span>${t}</span>`;
                });
                html += '</div></div>';
            });
            modalBody.innerHTML = html;
        }

        function openModal(expId) {
            const data = experienceDetails[expId];
            if (!data) return;
            renderDetails(data);
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        document.querySelectorAll('.experience-card--expandable').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('a')) return;
                openModal(card.dataset.expId);
            });
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(card.dataset.expId);
                }
            });
        });

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
    
    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        button, .cta-button {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize skill bars on page load
    setTimeout(() => {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            bar.style.opacity = '1';
            bar.style.visibility = 'visible';
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }, 1000);
    
    // Add loading animation for images (excluding profile image and social icons)
    const images = document.querySelectorAll('img:not(.profile-container img):not(.social-link img)');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open modals or overlays
            const modals = document.querySelectorAll('.modal, .overlay');
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                }
            });
        }
    });
    
    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Apply throttling to scroll events
    const throttledScrollHandler = throttle(() => {
        // Scroll-based animations and effects
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    console.log('Portfolio initialized successfully! 🚀');
});


