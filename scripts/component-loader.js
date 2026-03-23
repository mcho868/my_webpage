// Component Loader - Loads HTML components into the main page
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentPath}: ${response.status}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Load components in order
    await loadComponent('nav-component', './components/nav.html');
    await loadComponent('hero-component', './components/hero.html');
    await loadComponent('about-component', './components/about.html');
    await loadComponent('projects-component', './components/projects.html');
    await loadComponent('skills-component', './components/skills.html');
    await loadComponent('experience-component', './components/experience.html');
    await loadComponent('interests-component', './components/interests.html');
    await loadComponent('contact-component', './components/contact.html');
    await loadComponent('footer-component', './components/footer.html');

    // Initialize mobile menu after components are loaded
    initializeMobileMenu();

    // Initialize experience toggle for mobile
    const techExperience = document.getElementById('tech-experience');
    if (techExperience && window.innerWidth <= 768) {
        techExperience.classList.add('active');
    }

    document.dispatchEvent(new CustomEvent('components:loaded'));
});

// Mobile menu initialization
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const themeSwitch = document.querySelector('.theme-switch');

    if (!mobileMenuToggle || !navLinks) {
        console.warn('Mobile menu elements not found');
        return;
    }

    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        if (themeSwitch) {
            themeSwitch.classList.toggle('show-mobile');
        }
    });

    // Close mobile menu when a link is clicked
    const navLinksArray = document.querySelectorAll('.nav-links a');
    navLinksArray.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            if (themeSwitch) {
                themeSwitch.classList.remove('show-mobile');
            }
        });
    });
}
