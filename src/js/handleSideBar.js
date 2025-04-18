const sideBarParent = document.getElementById("sidebar-parent");
const sideBar = document.getElementById("sidebar");
const closeBtn = document.getElementById("close-btn");

if (sideBar) {
  sideBar.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

function handleClose() {
  if (sideBar) {
    sideBar.style.transform = "translateX(-450px)";
  }
  setTimeout(() => {
    if (sideBarParent) {
      sideBarParent.style.display = "none";
    }
  }, 500);
}
if (sideBarParent && closeBtn) {
  closeBtn.addEventListener("click", handleClose);
  sideBarParent.addEventListener("click", handleClose);
  window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
      if (sideBarParent && sideBar) {
        sideBar.style.transform = "translateX(0)";
        sideBarParent.style.display = "flex";
      }
    }
  });
}