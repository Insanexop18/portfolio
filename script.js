// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);

// Theme toggle with animation
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Add transition class to body for smooth theme change
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';

    // Update theme
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Add scale animation effect (no rotation)
    themeToggle.style.transform = 'scale(1.1)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 200);

    // Re-initialize feather icons to ensure they display correctly
    feather.replace();
});

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in-up class
document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
});

// Animate Progress Bars when visible
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            });
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe skills section for progress bar animation
document.querySelectorAll('.skills-category').forEach(category => {
    progressObserver.observe(category);
});

// Case Study Modal
const modal = document.getElementById('caseStudyModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

// Case study data
const caseStudies = {
    ecommerce: {
        title: 'E-Commerce Platform Transformation',
        image: 'https://via.placeholder.com/900x400',
        overview: 'Led the complete redesign and development of a multi-vendor e-commerce platform, focusing on user experience, performance optimization, and conversion rate improvement. The project involved rebuilding the frontend with React, implementing a headless architecture, and integrating advanced analytics.',
        results: [
            { number: '+300%', label: 'Conversion Rate' },
            { number: '+$2.5M', label: 'Annual Revenue' },
            { number: '45%', label: 'Faster Load Time' },
            { number: '4.8/5', label: 'User Rating' }
        ],
        highlights: [
            'Implemented a mobile-first responsive design that improved mobile conversions by 250%',
            'Integrated Stripe payment gateway with support for multiple currencies and payment methods',
            'Built a real-time inventory management system with automated stock alerts',
            'Developed an AI-powered product recommendation engine that increased average order value by 35%',
            'Created a comprehensive admin dashboard with advanced analytics and reporting',
            'Optimized site performance achieving 95+ Google Lighthouse scores'
        ],
        testimonial: {
            text: 'The transformation of our e-commerce platform exceeded all expectations. Not only did we see immediate improvements in conversion rates, but the new system is also incredibly easy to manage. The attention to detail and technical expertise was outstanding.',
            author: 'Sarah Johnson, CEO of RetailCo'
        }
    },
    analytics: {
        title: 'Marketing Analytics Dashboard',
        image: 'https://via.placeholder.com/900x400',
        overview: 'Designed and developed a comprehensive marketing analytics platform that consolidates data from multiple sources including Google Analytics, Facebook Ads, Google Ads, and email marketing platforms. The dashboard provides real-time insights and automated reporting for marketing teams.',
        results: [
            { number: '75%', label: 'Time Saved' },
            { number: '12+', label: 'Data Sources' },
            { number: '50K+', label: 'Daily Data Points' },
            { number: '99.9%', label: 'Uptime' }
        ],
        highlights: [
            'Integrated APIs from 12+ marketing platforms for unified data visualization',
            'Built custom D3.js visualizations for complex campaign performance metrics',
            'Implemented automated report generation and email distribution system',
            'Created predictive analytics models for budget allocation optimization',
            'Developed real-time alerting system for campaign performance anomalies',
            'Designed role-based access control for team collaboration'
        ],
        testimonial: {
            text: 'This dashboard has completely changed how we approach marketing decisions. Having all our data in one place with beautiful visualizations has made our team much more data-driven and efficient.',
            author: 'Michael Chen, CMO of TechStart'
        }
    },
    saas: {
        title: 'High-Converting SaaS Landing Page',
        image: 'https://via.placeholder.com/900x400',
        overview: 'Created a conversion-optimized landing page for a B2B SaaS product, implementing advanced A/B testing strategies and conversion rate optimization techniques. The project involved extensive user research, iterative design, and data-driven optimization.',
        results: [
            { number: '+425%', label: 'Sign-up Rate' },
            { number: '62%', label: 'Bounce Rate Reduction' },
            { number: '8.5 min', label: 'Avg. Session Duration' },
            { number: '12%', label: 'Trial-to-Paid Conversion' }
        ],
        highlights: [
            'Conducted extensive user research and competitor analysis to inform design decisions',
            'Implemented Google Optimize for continuous A/B testing of headlines, CTAs, and layouts',
            'Created animated product demonstrations using CSS and JavaScript',
            'Optimized page speed to achieve sub-2-second load times',
            'Designed trust-building elements including customer testimonials and security badges',
            'Integrated HubSpot for lead capture and automated nurture sequences'
        ],
        testimonial: {
            text: 'The new landing page has been a game-changer for our business. The conversion rate improvements have directly translated to significant revenue growth, and the ongoing optimization keeps delivering better results.',
            author: 'Emily Rodriguez, VP of Marketing at CloudSoft'
        }
    }
};

// Open modal when case study link is clicked
document.querySelectorAll('.case-study-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectKey = link.getAttribute('data-project');
        const caseStudy = caseStudies[projectKey];

        if (caseStudy) {
            displayCaseStudy(caseStudy);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function displayCaseStudy(caseStudy) {
    const resultsHTML = caseStudy.results.map(result => `
        <div class="result-card">
            <div class="result-number">${result.number}</div>
            <div class="result-label">${result.label}</div>
        </div>
    `).join('');

    const highlightsHTML = caseStudy.highlights.map(highlight => `
        <li>${highlight}</li>
    `).join('');

    modalBody.innerHTML = `
        <img src="${caseStudy.image}" alt="${caseStudy.title}" class="case-study-header">
        <h2 class="case-study-title">${caseStudy.title}</h2>

        <h3>Project Overview</h3>
        <p class="case-study-overview">${caseStudy.overview}</p>

        <h3>Key Results</h3>
        <div class="key-results">
            ${resultsHTML}
        </div>

        <div class="highlights-section">
            <h3>Campaign Highlights</h3>
            <ul>
                ${highlightsHTML}
            </ul>
        </div>

        <div class="testimonial-section">
            <h3>Client Testimonial</h3>
            <div class="testimonial-block">
                <p class="testimonial-text">"${caseStudy.testimonial.text}"</p>
                <p class="testimonial-author">— ${caseStudy.testimonial.author}</p>
            </div>
        </div>
    `;

    // Re-initialize feather icons in modal
    feather.replace();

    // Animate result cards
    setTimeout(() => {
        document.querySelectorAll('.result-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';

            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, index * 100);
        });
    }, 100);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Combined scroll handler for better performance
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

function handleScroll() {
    const scrolled = window.pageYOffset;
    const navbar = document.querySelector('.navbar');

    // Navbar shadow
    if (scrolled > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }

    // Removed parallax for section titles to prevent glitching

    // Parallax for floating shapes
    document.querySelectorAll('.shape').forEach((shape, index) => {
        const speed = 0.05 * (index + 1);
        const yPos = scrolled * speed;
        const currentTransform = shape.style.transform || '';
        if (!currentTransform.includes('translate(')) {
            shape.style.transform = `translateY(${yPos}px)`;
        }
    });

    // Scroll progress
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrolled / windowHeight) * 100;
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }

    // Scale effect for images
    document.querySelectorAll('.about-image img').forEach(img => {
        const rect = img.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
            const imgCenter = rect.top + rect.height / 2;
            const screenCenter = windowHeight / 2;
            const distance = Math.abs(imgCenter - screenCenter);
            const maxDistance = windowHeight / 2;
            const scale = 1 + (0.05 * (1 - Math.min(distance / maxDistance, 1)));

            if (!img.matches(':hover')) {
                img.style.transform = `scale(${scale})`;
            }
        }
    });
}

// Particle System for Hero Section
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > this.canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(1, 195, 142, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particle canvas (only on desktop)
const isMobile = window.innerWidth <= 768;

if (!isMobile) {
    const heroSection = document.querySelector('.hero-section');
    const particleCanvas = document.createElement('canvas');
    particleCanvas.style.position = 'absolute';
    particleCanvas.style.top = '0';
    particleCanvas.style.left = '0';
    particleCanvas.style.width = '100%';
    particleCanvas.style.height = '100%';
    particleCanvas.style.pointerEvents = 'none';
    particleCanvas.style.opacity = '0.6';
    heroSection.style.position = 'relative';
    heroSection.insertBefore(particleCanvas, heroSection.firstChild);

    const ctx = particleCanvas.getContext('2d');
    let particles = [];

    function initParticles() {
        particleCanvas.width = heroSection.offsetWidth;
        particleCanvas.height = heroSection.offsetHeight;
        particles = [];
        const particleCount = Math.floor((particleCanvas.width * particleCanvas.height) / 15000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(particleCanvas));
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    ctx.strokeStyle = `rgba(1, 195, 142, ${0.15 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            initParticles();
        }
    });
}

// Mouse trail effect
let mouseX = 0;
let mouseY = 0;
const trail = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    trail.push({
        x: mouseX,
        y: mouseY,
        timestamp: Date.now()
    });

    if (trail.length > 20) {
        trail.shift();
    }
});

// Cursor interaction with project cards
document.querySelectorAll('.project-card, .skill-card, .article-item').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Number counter animation for result cards
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}


// Text typing effect for hero section (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Ripple effect on button clicks
document.querySelectorAll('.btn, .project-link, .social-link').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.id = 'scroll-progress';
scrollProgress.style.position = 'fixed';
scrollProgress.style.top = '0';
scrollProgress.style.left = '0';
scrollProgress.style.height = '4px';
scrollProgress.style.background = 'linear-gradient(135deg, #01c38e, #29e9b8)';
scrollProgress.style.width = '0%';
scrollProgress.style.zIndex = '9999';
scrollProgress.style.transition = 'width 0.1s ease';
document.body.appendChild(scrollProgress);

// Magnetic button effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
});

// Text reveal animation on scroll (simplified)
const textRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            textRevealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Apply text reveal to specific elements
document.querySelectorAll('.about-text p, .contact-intro').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    textRevealObserver.observe(el);
});

// Removed glitch effect to prevent positioning issues

// Scroll-triggered counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.textContent);

            if (!isNaN(target)) {
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        }
    });
}, { threshold: 0.5 });

// Stagger animation for skill cards
const skillCardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.skill-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            });
            skillCardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skills-grid').forEach(grid => {
    skillCardObserver.observe(grid);
});

// Add smooth hover effect to navigation links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.letterSpacing = '1px';
    });

    link.addEventListener('mouseleave', function() {
        this.style.letterSpacing = '0px';
    });
});

// Highlight Items Animation Observer
const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all highlight items
document.querySelectorAll('.highlight-item').forEach(item => {
    highlightObserver.observe(item);
});
