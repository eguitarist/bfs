document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header .container");
    const nav = document.querySelector("header nav ul");

    const burger = document.createElement("div");
    burger.className = "burger";
    burger.innerHTML = "<span></span><span></span><span></span>";
    header.appendChild(burger);

    const toggleMenu = () => {
        nav.classList.toggle("open");
        burger.classList.toggle("active");
    };

    burger.addEventListener("click", toggleMenu);

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("open");
            burger.classList.remove("active");
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            nav.classList.remove("open");
            burger.classList.remove("active");
        }
    });

    const preloader = document.createElement("div");
    preloader.id = "preloader";
    preloader.innerHTML = `
    <div class="spinner">
    <svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="42"/>
    </svg>
    </div>`;
    document.body.appendChild(preloader);

    window.addEventListener("load", () => {
        preloader.style.opacity = "0";
        setTimeout(() => preloader.remove(), 700);
    });

    setTimeout(() => preloader.remove(), 9000);

    const themeBtn = document.createElement("div");
    themeBtn.className = "theme-toggle";
    themeBtn.setAttribute("aria-label", "Переключить тему");
    header.insertBefore(themeBtn, document.querySelector("header nav"));

    const setTheme = isLight => {
        document.body.classList.toggle("light-theme", isLight);
        themeBtn.textContent = isLight ? "☀️" : "🌙";
        localStorage.setItem("theme", isLight ? "light" : "dark");
    };

    const saved = localStorage.getItem("theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

    setTheme(saved === "light" || (!saved && prefersLight));

    themeBtn.addEventListener("click", () => {
        setTheme(!document.body.classList.contains("light-theme"));
    });

    document.querySelectorAll("img").forEach(img => img.setAttribute("loading", "lazy"));
});
