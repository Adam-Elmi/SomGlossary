const sideBarParent = document.getElementById("sidebar-parent");
const sideBar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menu-btn");

if (sideBarParent && menuBtn) {
    menuBtn.addEventListener("click", () => {
        if (sideBar) {
            sideBar.style.transform = "translateX(-450px)";
            setTimeout(() => {
                sideBar.style.transform = "translateX(0)";
            }, 100);
        }
        sideBarParent.style.display = "flex";
        document.body.style.overflow = "hidden";
    });
}
const themeContainer = document.getElementById("theme-container");
const themeBtn = document.getElementById("theme-btn");
let isVisible = false;
if (themeContainer && themeBtn) {
    themeBtn.addEventListener("click", () => {
        isVisible = !isVisible;
        if (isVisible) {
            themeContainer.style.display =
                "flex";
        } else {
            themeContainer.style.display =
                "none";
        }
    });
    const instances = SVGElement || SVGPathElement || SVGGElement;
    window.addEventListener("click", (e) => {
        if (
            !(e.target instanceof instances) &&
            e.target !== themeBtn
        ) {
            isVisible = false;
            themeContainer.style.display =
                "none";
        }
    });

    const lightModeBtn = document.getElementById("light-mode-btn");
    const darkModeBtn = document.getElementById("dark-mode-btn");
    const defaultModeBtn =
        document.getElementById("default-mode-btn");

    function store_theme(themeValue) {
        if (themeValue) {
             document.documentElement.setAttribute("data-theme", themeValue);
            localStorage.setItem("theme", themeValue);
        }
    }
    
    const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches;
    store_theme(isDarkMode ? "dark" : "light");

    function changeTheme(e) {
        const target = e.target;
        switch (target.id) {
            case "light-mode-btn":
                store_theme("light");
                break;
            case "dark-mode-btn":
                store_theme("dark");
                break;
            default:
                const isDarkMode = window.matchMedia(
                    "(prefers-color-scheme: dark)",
                ).matches;
                store_theme(isDarkMode ? "dark" : "light");
                break;
        }
        
    }
    lightModeBtn?.addEventListener("click", changeTheme);
    darkModeBtn?.addEventListener("click", changeTheme);
    defaultModeBtn?.addEventListener("click", changeTheme);
}