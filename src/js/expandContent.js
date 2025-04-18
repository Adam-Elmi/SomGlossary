const headerBtns = document.querySelectorAll("#header-btn");
const contentList = document.querySelectorAll("#content-list");
const arrowElements = document.querySelectorAll("#arrow-element");

if (contentList && headerBtns) {
  headerBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      console.log(index);
      if (contentList[index].classList.contains("hideContent")) {
        contentList[index].classList.remove("hideContent");
        arrowElements[index].style.transform = "rotate(360deg)";
      } else {
        contentList[index].classList.add("hideContent");
        arrowElements[index].style.transform = "rotate(180deg)";
      }
    });
  });
}
