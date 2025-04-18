const searchInputs = document.querySelectorAll("#search-input");
const searchIcons = document.querySelectorAll("#search-icon");
const resultBackground =
    document.getElementById("result-background");
if (searchInputs && resultBackground) {
    resultBackground.style.transform = "translateY(-100vh)";
    searchInputs.forEach((input) => {
        input.addEventListener("focus", () => {
            showSearchBar(resultBackground);
        });
    });
    searchIcons.forEach((icon) => {
        icon.addEventListener("click", () => {
            showSearchBar(resultBackground);
        });
    });
}
function showSearchBar(resultBackground) {
    resultBackground.style.display = "flex";
    setTimeout(() => {
        resultBackground.style.transform = "translateY(0)";
    }, 100);
}

const searchContainers = document.querySelectorAll("#search-container");
if (searchContainers && searchInputs) {
    searchInputs.forEach((input, index) => {
        input.addEventListener("focus", () => {
            searchContainers[index].style.outline =
                "2px solid oklch(70.7% 0.165 254.624)";
        });
        input.addEventListener("blur", () => {
            searchContainers[index].style.outline =
                "none";
        });
    });
}