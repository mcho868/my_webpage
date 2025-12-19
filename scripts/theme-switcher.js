document.addEventListener('DOMContentLoaded', function() {
    // Get the theme toggle checkbox
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    // Apply saved theme if it exists, otherwise use default dark theme
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.checked = false;
    } else {
        document.body.classList.remove('light-theme');
        themeToggle.checked = true;
    }
    
    // Add event listener to toggle theme
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            // Dark theme
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            // Light theme
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        }
    });
});