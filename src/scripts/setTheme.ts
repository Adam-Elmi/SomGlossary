// Elements
const html = document.querySelector("html");
const navBar = document.getElementById("nav-bar");
const searchInputs = document.querySelectorAll("#search-container");
const themeContainer = document.getElementById("theme-container");
const sideBar = document.getElementById("sidebar");
const filterContainer = document.getElementById("filter-container");
const listContainer = document.getElementById("list-container");
const viewSection = document.getElementById("view-section");
const footer = document.querySelector("footer");

const colors = {
  c1: "#0f172b",
  c2: "#1d293d",
  c3: "#314158",
  c4: "#aad",
  c5: "#0079FF",
  c6: "#1D2B53",
}

type Styles = {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
};
type Directions = "top" | "left" | "right" | "bottom" | "tlrb";
const directionsMap: any = {
  top: "borderTopColor",
  left: "borderLeftColor",
  right: "borderRightColor",
  bottom: "borderBottomColor",
};

function setStyle(element: any, styles: Styles = {}, direction?: Directions, colors?:string[]) {
  
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
      if(direction && colors) {
        switch(direction) {
          case "top":
            el.style[directionsMap.top] = colors[0];
            break;
          case "left":
            el.style[directionsMap.left] = colors[0];
            break;
          case "right":
            el.style[directionsMap.right] = colors[0];
            break;
          case "bottom":
            el.style[directionsMap.bottom] = colors[0];
            break;
          case "tlrb":
            el.style[directionsMap.top] = colors[0] ? colors[0] : "";
            el.style[directionsMap.left] = colors[1] ? colors[1] : "";
            el.style[directionsMap.right] = colors[2] ? colors[2] : "";
            el.style[directionsMap.bottom] = colors[3] ? colors[3] : "";
            break;
        }
      } else {
    if(borderColor) {
        el.style.borderColor = borderColor;
    }
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
        setStyle(document.body, { backgroundColor: colors.c1 });
        setStyle(navBar, { backgroundColor: colors.c1, textColor: "white", borderColor: colors.c2 });
        searchInputs.forEach(input => {
          setStyle(input, { backgroundColor: colors.c3, textColor: "#fff", borderColor: colors.c2 });
          if (input.lastElementChild && input.lastElementChild.tagName === "BUTTON") {
            setStyle(input.lastElementChild, { backgroundColor: colors.c5, borderColor: "#777" })
          }
        });
        setStyle(themeContainer, { backgroundColor: "#0f172b" });
        setStyle(sideBar, { backgroundColor: colors.c1 });
        setStyle(filterContainer?.parentElement, { borderColor: colors.c2 });
        setStyle(filterContainer, { textColor: "#fff", borderColor: colors.c2, backgroundColor: colors.c3 });
        setStyle(listContainer?.parentElement, { borderColor: colors.c2 });
        setStyle(listContainer, { textColor: "#fff", borderColor: colors.c3 });
        if(listContainer && listContainer.children.length > 0) {
          Array.from(listContainer.children).forEach(child => {
            setStyle(child, { backgroundColor: colors.c6, textColor: "#fff", borderColor: colors.c2 });
            if(child.lastElementChild && child.lastElementChild.tagName === "A") {
              setStyle(child.lastElementChild, { textColor: "#fff" });
            }
          })
        };
        setStyle(viewSection, { backgroundColor: colors.c1, textColor: "#fff", borderColor: colors.c2 });
        if(viewSection && viewSection.children.length > 0) {
          Array.from(viewSection.children).forEach(child => {
            
          });
        }
        setStyle(footer, { backgroundColor: colors.c1}, "tlrb", [colors.c2, colors.c5]);
        console.log("Dark mode");
        break;
      default: {
        console.log("System mode");
      }
    }
  }
};

export default setTheme;