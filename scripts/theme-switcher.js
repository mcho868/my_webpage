// Theme is permanently dark — toggle does nothing visual but stays for UI consistency
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Always dark
        themeToggle.checked = true;
        document.body.classList.remove('light-theme');
    }
});
