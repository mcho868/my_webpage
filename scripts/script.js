// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling (placeholder)
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! This is a demo form - in a real implementation, this would send your message to Brendan.');
        this.reset();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Nav components load async — poll until they exist
    function initMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        if (!mobileMenuToggle || !navLinks) {
            setTimeout(initMobileMenu, 100);
            return;
        }

        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    initMobileMenu();
    
    // Theme switcher functionality
    const themeButtons = document.querySelectorAll('.theme-option');
    
    // Check for saved theme preference or get system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        setActiveThemeButton(savedTheme);
    } else {
        // Default to light theme
        document.documentElement.setAttribute('data-theme', 'light');
        setActiveThemeButton('light');
    }
    
    // Add click event for theme buttons
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            setActiveThemeButton(theme);
        });
    });
    
    // Helper to set active theme button
    function setActiveThemeButton(theme) {
        themeButtons.forEach(btn => {
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
});

// Project folder toggle functionality
function toggleFolder(folderId) {
    const folderElement = document.getElementById(folderId);
    const projectFolder = folderElement.closest('.project-folder');
    
    if (projectFolder.classList.contains('expanded')) {
        projectFolder.classList.remove('expanded');
    } else {
        // Close all other folders first (optional - remove this if you want multiple folders open)
        document.querySelectorAll('.project-folder.expanded').forEach(folder => {
            folder.classList.remove('expanded');
        });
        
        // Open the clicked folder
        projectFolder.classList.add('expanded');
    }
}

// Initialize project folders - start with first folder expanded
document.addEventListener('DOMContentLoaded', function() {
    // Optional: Auto-expand the first folder on page load
    const firstFolder = document.querySelector('.project-folder');
    if (firstFolder) {
        firstFolder.classList.add('expanded');
    }
});
// Experience section toggle for mobile
function toggleExperience(type) {
    const techBtn = document.getElementById('tech-btn');
    const nonTechBtn = document.getElementById('non-tech-btn');
    const techExperience = document.getElementById('tech-experience');
    const nonTechExperience = document.getElementById('non-tech-experience');
    
    if (type === 'tech') {
        techBtn.classList.add('active');
        nonTechBtn.classList.remove('active');
        techExperience.classList.add('active');
        nonTechExperience.classList.remove('active');
    } else {
        nonTechBtn.classList.add('active');
        techBtn.classList.remove('active');
        nonTechExperience.classList.add('active');
        techExperience.classList.remove('active');
    }
}

// Initialize mobile experience toggle - default to tech view
document.addEventListener('DOMContentLoaded', function() {
    const techExperience = document.getElementById('tech-experience');
    if (techExperience && window.innerWidth <= 768) {
        techExperience.classList.add('active');
    }
});
