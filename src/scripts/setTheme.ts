// Elements
const html = document.querySelector("html");
const body = document.body;
const navBar = document.getElementById("nav-bar");
const searchInputs = document.querySelectorAll("#search-container");
const themeContainer = document.getElementById("theme-container");
const sideBar = document.getElementById("sidebar");
const filterContainer = document.getElementById("filter-container");
const listContainer = document.getElementById("list-container");
const viewSection = document.getElementById("view-section");

const colors = {
  c1: "#0f172b",
  c2: "#1d293d",
  c3: "#314158",
  c4: "#aad",
  c5: "#615fff",
  c6: "#1D2B53",
}

type Styles = {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
};

function setStyle(element: any, styles: Styles = {}) {
  const { backgroundColor, textColor, borderColor } = styles;
  if(element) {
    const el = (element as HTMLElement);
    el.style.transition = "all 0.5s";
    if(backgroundColor) {
      el.style.backgroundColor = backgroundColor;
    }
    if(textColor) {
      el.style.color = textColor;
    }
    if(borderColor) {
      el.style.borderColor = borderColor;
    }
  } else {
    console.error(`${element} is not defined!`);
  }
}

function setTheme() {
  if(html) {
    html.dataset.theme = "dark";
    switch (html.dataset.theme) {
      case "light":
        console.log("Light mode");
        break;
      case "dark":
        setStyle(navBar, { backgroundColor: colors.c1, textColor: "white", borderColor: colors.c2 });
        searchInputs.forEach(input => {
          setStyle(input, { backgroundColor: colors.c3, textColor: "#fff", borderColor: colors.c2 });
          if (input.lastElementChild && input.lastElementChild.tagName === "BUTTON") {
            setStyle(input.lastElementChild, { backgroundColor: colors.c5, borderColor: colors.c4 })
          }
        });
        setStyle(themeContainer, { backgroundColor: "#0f172b" });
        setStyle(sideBar, { backgroundColor: colors.c1 });
        setStyle(filterContainer?.parentElement, { borderColor: colors.c2 });
        setStyle(filterContainer, { textColor: "#fff", borderColor: colors.c2, backgroundColor: colors.c3 });
        setStyle(listContainer?.parentElement, { borderColor: colors.c3 });
        setStyle(listContainer, { textColor: "#fff", borderColor: colors.c3 });
        if(listContainer && listContainer.children.length > 0) {
          Array.from(listContainer.children).forEach(child => {
            setStyle(child, { backgroundColor: colors.c6, textColor: "#fff", borderColor: colors.c2 });
            if(child.lastElementChild && child.lastElementChild.tagName === "A") {
              setStyle(child.lastElementChild, { textColor: "#fff" });
            }
          })
        };
        setStyle(viewSection, { backgroundColor: colors.c1, textColor: "#fff" });
        console.log("Dark mode");
        break;
      default: {
        console.log("System mode");
      }
    }
  }
};

export default setTheme;