
const searchTriggers = document.querySelectorAll(".search-trigger");
const resultBackground = document.getElementById("result-background");
const searchModal = document.getElementById("search-modal");
const functionalInput = document.getElementById("functional-search-input");

function showSearchBar() {
    if (!resultBackground || !searchModal) return;

    resultBackground.style.display = "flex";
    document.body.style.overflow = "hidden";

    // Trigger animations
    setTimeout(() => {
        resultBackground.classList.remove("opacity-0");
        searchModal.classList.remove("scale-95");

        if (functionalInput) {
            functionalInput.focus();
        }
    }, 10);
}

if (searchTriggers && resultBackground) {
    searchTriggers.forEach((trigger) => {
        trigger.addEventListener("click", showSearchBar);

        // Handle focus on input
        const input = trigger.querySelector("input");
        if (input) {
            input.addEventListener("focus", (e) => {
                e.preventDefault();
                input.blur();
                showSearchBar();
            });
        }
    });
}

// Global Keyboard Shortcut (⌘K or Ctrl+K)
window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        showSearchBar();
    }
});
