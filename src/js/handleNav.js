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

    function applyTheme(theme) {
        document.documentElement.setAttribute("data-theme", theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    function changeTheme(e) {
        const targetId = e.currentTarget.id;

        if (targetId === "light-mode-btn") {
            applyTheme("light");
            localStorage.setItem("theme", "light");
        } else if (targetId === "dark-mode-btn") {
            applyTheme("dark");
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.removeItem("theme");
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            applyTheme(systemTheme);
        }
    }
    lightModeBtn?.addEventListener("click", changeTheme);
    darkModeBtn?.addEventListener("click", changeTheme);
    defaultModeBtn?.addEventListener("click", changeTheme);

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
            applyTheme(e.matches ? "dark" : "light");
        }
    });
}