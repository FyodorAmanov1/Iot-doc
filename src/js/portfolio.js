// Portfolio Page Animations and Interactions

// Scroll-triggered animations
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

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.work-section, .work-card, .feature-item, .achievement-item, .timeline-item, .stat-item, .project-link-card');
    
    animatedElements.forEach((el, index) => {
        // Add different animation classes based on position
        if (index % 3 === 0) {
            el.classList.add('fade-in');
        } else if (index % 3 === 1) {
            el.classList.add('slide-in-left');
        } else {
            el.classList.add('slide-in-right');
        }
        
        // Add delay for staggered animation (reduced from 0.1s to 0.05s)
        el.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(el);
    });

    // Animate stats counter
    animateCounters();
    
    // Add hover effects to badges
    setupBadgeAnimations();
    
    // Parallax effect for hero section
    setupParallax();
});

// Animated counter for statistics
function animateCounters() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const target = stat.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
        
        if (isNaN(numericValue)) return;
        
        const duration = 1000; // 1 second (reduced from 2 seconds)
        const steps = 40;
        const increment = numericValue / steps;
        let current = 0;
        let step = 0;
        
        const counter = setInterval(() => {
            step++;
            current += increment;
            
            if (step >= steps) {
                stat.textContent = target; // Set final value
                clearInterval(counter);
            } else {
                let displayValue = Math.floor(current);
                if (isPercentage) {
                    stat.textContent = displayValue + '%';
                } else if (isPlus) {
                    stat.textContent = displayValue + '+';
                } else {
                    stat.textContent = displayValue;
                }
            }
        }, duration / steps);
    });
}

// Setup badge animations with delay
function setupBadgeAnimations() {
    const badges = document.querySelectorAll('.badge');
    badges.forEach((badge, index) => {
        badge.style.setProperty('--i', index);
    });
}

// Parallax effect for hero section
function setupParallax() {
    const hero = document.querySelector('.portfolio-hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');
        
        if (heroContent && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.5;
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add ripple effect to buttons and cards
document.querySelectorAll('.work-card, .achievement-item, .project-link-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 300);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 122, 255, 0.3);
        transform: scale(0);
        animation: rippleAnimation 0.3s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

