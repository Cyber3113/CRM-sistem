document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const sidebarToggler = document.getElementById("sidebar-toggler");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const darkModeIcon = document.getElementById("darkModeIcon");

    // 🌙 Dark mode saqlangan holatini tekshirish
    if (localStorage.getItem("dark-mode") === "enabled") {
        enableDarkMode();
    }

    // 📌 Sidebar toggler
    sidebarToggler.addEventListener("click", function () {
        sidebar.classList.toggle("expanded");
    });

        // Sidebarni tashqarisiga bosilganda yopish
        document.addEventListener("click", function (event) {
            if (!sidebar.contains(event.target) && !sidebarToggler.contains(event.target)) {
                sidebar.classList.remove("expanded");
            }
        });

    // 🌙 Dark mode toggle
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.contains("dark-mode") ? disableDarkMode() : enableDarkMode();
    });

    function enableDarkMode() {
        document.body.classList.add("dark-mode");
        darkModeIcon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("dark-mode", "enabled");
    }

    function disableDarkMode() {
        document.body.classList.remove("dark-mode");
        darkModeIcon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("dark-mode", "disabled");
    }
});