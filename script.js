const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
if (savedTheme === 'light') {
    themeIcon.classList.remove('bx-sun');
    themeIcon.classList.add('bx-moon');
}

// Theme toggle functionality
function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'light') {
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
    } else {
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
    }
}

themeToggle.addEventListener('click', toggleTheme);
themeToggle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
    }
});

// Scroll to Top Button and Progress Bar
const scrollTopBtn = document.getElementById('scroll-top');
const scrollProgress = document.getElementById('scroll-progress');

function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }
    
    if (scrollTopBtn) {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
}

window.addEventListener('scroll', updateScrollProgress);
updateScrollProgress();

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Live Clock
const clockElement = document.getElementById('clock-time');

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    if (clockElement) {
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

updateClock();
setInterval(updateClock, 1000);

// Animated Background Particles
function createParticles() {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;

    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        
        // Random size
        const size = 2 + Math.random() * 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particlesContainer.appendChild(particle);
    }
}

// Create particles on load
createParticles();

// Typing Effect for Home Section
function typeWriter(element, text, speed = 100) {
    if (!element) return;
    
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

// Add typing effect to description (optional - can be enabled)
// const homeDescription = document.querySelector('.home-detail p');
// if (homeDescription) {
//     const originalText = homeDescription.textContent;
//     typeWriter(homeDescription, originalText, 30);
// }

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animate counters
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                if (!counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    animateCounter(counter);
                }
            });
            
            // Animate skill bars
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    observer.observe(section);
});

// Observe skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.classList.add('animate-on-scroll');
    observer.observe(item);
});

// Observe stat items
document.querySelectorAll('.stat-item').forEach(item => {
    item.classList.add('animate-on-scroll');
    observer.observe(item);
});

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

const activePage = () => {
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');

    header.classList.remove('active');
    setTimeout(() => {
        header.classList.add('active');
    }, 1100);

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    barsBox.classList.remove('active');
    setTimeout(() => {
        barsBox.classList.add('active');
    }, 1100);

    sections.forEach(section => {
        section.classList.remove('active');
    });

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}

navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if (!link.classList.contains('active')) {
            activePage();

            link.classList.add('active');

            setTimeout(() => {
                sections[idx].classList.add('active');
            }, 1100);
        }
    });
});

logoLink.addEventListener('click', () => {
    if (!navLinks[0].classList.contains('active')) {
        activePage();

        navLinks[0].classList.add('active');

        setTimeout(() => {
            sections[0].classList.add('active');
        }, 1100);
    }
});

const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn, idx) => { 
    btn.addEventListener('click', () => {
        const resumeDetails = document.querySelectorAll('.resume-detail');

        resumeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');

        resumeDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        resumeDetails[idx].classList.add('active');
        
        // Re-initialize expand/collapse after tab switch
        setTimeout(initExpandCollapse, 100);
    });
});

const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

let index = 0;

const activePortfolio = () => {
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
    const portfolioDetails = document.querySelectorAll('.portfolio-detail')

    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    portfolioDetails[index].classList.add('active');
}

arrowRight.addEventListener('click', () => {
    if (index < 5) {
        index++;
        arrowLeft.classList.remove('disabled');
        if (index === 5) {
            arrowRight.classList.add('disabled');
        }
    }

    activePortfolio();
});

arrowLeft.addEventListener('click', () => {
    if (index > 0) {
        index--;
        arrowRight.classList.remove('disabled');
        if (index === 0) {
            arrowLeft.classList.add('disabled');
        }
    }

    activePortfolio();
});

// Portfolio carousel touch/swipe support
let touchStartX = 0;
let touchEndX = 0;
const portfolioCarousel = document.querySelector('.portfolio-carousel');

if (portfolioCarousel) {
    portfolioCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    portfolioCarousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50 && index < 5) {
            arrowRight.click();
        }
        if (touchEndX > touchStartX + 50 && index > 0) {
            arrowLeft.click();
        }
    }
}

// Contact Form Submission with Real-time Validation
const form = document.querySelector('form');
const alertSuccess = document.querySelector('.alert.success');
const alertError = document.querySelector('.alert.error');

// Real-time form validation
if (form) {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });

    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove previous error styling
        field.style.borderColor = '';
        
        if (field.hasAttribute('required') && !value) {
            field.style.borderColor = '#f44336';
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.style.borderColor = '#f44336';
                return false;
            }
        }
        
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[0-9]{11}$/;
            if (!phoneRegex.test(value)) {
                field.style.borderColor = '#f44336';
                return false;
            }
        }
        
        field.style.borderColor = '#1cade4';
        return true;
    }

    function clearError(e) {
        const field = e.target;
        if (field.style.borderColor === 'rgb(244, 67, 54)') {
            field.style.borderColor = '';
        }
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                isValid = false;
            }
        });

        if (!isValid) {
            alertError.style.display = 'block';
            setTimeout(() => {
                alertError.style.display = 'none';
            }, 5000);
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Get form data
            const formData = new FormData(form);

            // Send form data to Formspree
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            // Handle response
            if (response.ok) {
                // Show success message
                alertSuccess.style.display = 'block';
                form.reset(); // Clear form fields
                
                // Reset border colors
                inputs.forEach(input => {
                    input.style.borderColor = '';
                });
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    alertSuccess.style.display = 'none';
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Show error message
            alertError.style.display = 'block';
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                alertError.style.display = 'none';
            }, 5000);
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Navigation is handled by existing activePage function
    });
});

// Add hover effects to service boxes
const serviceBoxes = document.querySelectorAll('.services-box');
serviceBoxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02) translateY(-5px)';
    });
    box.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// Remove parallax and floating - image stays fixed
// Image will not move anymore

// Add glow effect to active nav link
navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active')) {
            this.style.textShadow = '0 0 10px var(--main-color)';
        }
    });
    link.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.textShadow = 'none';
        }
    });
});

// Add cursor trail effect (optional - can be disabled for performance)
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        
        cursorTrail.push(trail);
        if (cursorTrail.length > maxTrailLength) {
            const oldTrail = cursorTrail.shift();
            oldTrail.remove();
        }
        
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0)';
            setTimeout(() => trail.remove(), 300);
        }, 100);
    }
});

// Add typing animation effect to headings
function typeHeading(element, text, speed = 50) {
    if (!element || element.dataset.typed) return;
    element.dataset.typed = 'true';
    
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

// Animate headings when they come into view
const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const originalText = entry.target.textContent;
            if (entry.target.classList.contains('heading')) {
                // Just add fade-in, not typing for headings
                entry.target.style.animation = 'fadeInUp 0.8s ease';
            }
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.heading, h2, h3').forEach(heading => {
    headingObserver.observe(heading);
});

// Add fadeInUp animation
const fadeInUpStyle = document.createElement('style');
fadeInUpStyle.textContent += `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeInUpStyle);

// Add number counting animation with delay
function animateNumbers() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach((counter, index) => {
        setTimeout(() => {
            if (!counter.classList.contains('counted')) {
                counter.classList.add('counted');
                animateCounter(counter);
            }
        }, index * 200);
    });
}

// Trigger number animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.home-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add smooth reveal animation to service boxes
const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
            }, index * 100);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.services-box').forEach(box => {
    serviceObserver.observe(box);
});

// Add pulse effect to main color elements on hover
document.querySelectorAll('.btn, .logo, .theme-toggle').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 1s ease infinite';
    });
    element.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
    });
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent += `
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(28, 173, 228, 0.7);
        }
        50% {
            box-shadow: 0 0 0 10px rgba(28, 173, 228, 0);
        }
    }
`;
document.head.appendChild(pulseStyle);

// Add cursor trail CSS
const cursorTrailStyle = document.createElement('style');
cursorTrailStyle.textContent += `
    .cursor-trail {
        position: fixed;
        width: 6px;
        height: 6px;
        background: var(--main-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: opacity 0.3s, transform 0.3s;
        box-shadow: 0 0 10px var(--main-color);
    }
`;
document.head.appendChild(cursorTrailStyle);

// Expand/Collapse functionality for resume items and service boxes
function initExpandCollapse() {
    // Resume Items
    const resumeItems = document.querySelectorAll('.resume-item');
    resumeItems.forEach(item => {
        // Skip if already processed
        if (item.dataset.processed) return;
        item.dataset.processed = 'true';
        
        const content = item.querySelector('p:not(.year):not(.company)');
        if (content) {
            // Check if content needs expansion
            const lineHeight = parseFloat(window.getComputedStyle(content).lineHeight);
            const maxHeight = lineHeight * 2.5; // ~2.5 lines
            const contentHeight = content.scrollHeight;
            
            if (contentHeight > maxHeight) {
                item.classList.add('needs-expand', 'collapsed');
                
                // Create expand button
                const expandBtn = document.createElement('button');
                expandBtn.className = 'expand-btn';
                expandBtn.innerHTML = 'Read More <i class="bx bx-chevron-down"></i>';
                
                expandBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    item.classList.toggle('collapsed');
                    item.classList.toggle('expanded');
                    
                    if (item.classList.contains('expanded')) {
                        expandBtn.innerHTML = 'Read Less <i class="bx bx-chevron-up"></i>';
                    } else {
                        expandBtn.innerHTML = 'Read More <i class="bx bx-chevron-down"></i>';
                    }
                });
                
                // Wrap the description paragraph only
                const wrapper = document.createElement('div');
                wrapper.className = 'content-wrapper';
                content.parentNode.insertBefore(wrapper, content);
                wrapper.appendChild(content);
                
                item.appendChild(expandBtn);
            }
        }
    });

    // Service Boxes
    const serviceBoxes = document.querySelectorAll('.services-box');
    serviceBoxes.forEach(box => {
        // Skip if already processed
        if (box.dataset.processed) return;
        box.dataset.processed = 'true';
        
        const content = box.querySelector('p');
        if (content) {
            const lineHeight = parseFloat(window.getComputedStyle(content).lineHeight);
            const maxHeight = lineHeight * 2.5; // ~2.5 lines
            const contentHeight = content.scrollHeight;
            
            if (contentHeight > maxHeight) {
                box.classList.add('needs-expand', 'collapsed');
                
                // Create expand button
                const expandBtn = document.createElement('button');
                expandBtn.className = 'expand-btn';
                expandBtn.innerHTML = 'Read More <i class="bx bx-chevron-down"></i>';
                
                expandBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    box.classList.toggle('collapsed');
                    box.classList.toggle('expanded');
                    
                    if (box.classList.contains('expanded')) {
                        expandBtn.innerHTML = 'Read Less <i class="bx bx-chevron-up"></i>';
                    } else {
                        expandBtn.innerHTML = 'Read More <i class="bx bx-chevron-down"></i>';
                    }
                });
                
                // Wrap the paragraph only
                const wrapper = document.createElement('div');
                wrapper.className = 'content-wrapper';
                content.parentNode.insertBefore(wrapper, content);
                wrapper.appendChild(content);
                
                box.appendChild(expandBtn);
            }
        }
    });
}

// Initialize expand/collapse on page load and section change
setTimeout(initExpandCollapse, 500);

// Why Hire Me description toggle
const descToggle = document.getElementById('desc-toggle');
const whyHireMeBox = document.querySelector('.resume-box:first-child');

if (descToggle && whyHireMeBox) {
    descToggle.addEventListener('click', () => {
        whyHireMeBox.classList.toggle('expanded');
        
        if (whyHireMeBox.classList.contains('expanded')) {
            descToggle.innerHTML = 'Read Less <i class="bx bx-chevron-up"></i>';
        } else {
            descToggle.innerHTML = 'Read More <i class="bx bx-chevron-down"></i>';
        }
    });
}

// Re-initialize when resume section becomes active
const resumeSection = document.querySelector('.resume');
if (resumeSection) {
    const resumeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(initExpandCollapse, 300);
            }
        });
    }, { threshold: 0.1 });
    resumeObserver.observe(resumeSection);
}

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Apply ripple to all buttons
document.querySelectorAll('.btn, .resume-btn, .theme-toggle, .scroll-top').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn, .resume-btn, .theme-toggle, .scroll-top {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Loading animation
window.addEventListener('load', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 800);
    }
});

// Add fade-in animation to sections when they become active
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape' && navbar.classList.contains('active')) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
    
    // Arrow keys for portfolio navigation
    if (document.querySelector('.portfolio').classList.contains('active')) {
        if (e.key === 'ArrowRight' && index < 5) {
            arrowRight.click();
        }
        if (e.key === 'ArrowLeft' && index > 0) {
            arrowLeft.click();
        }
    }
});

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Scroll-based animations can be added here
    }, 10);
});
