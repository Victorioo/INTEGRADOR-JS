window.addEventListener("scroll", () => {
  let header = document.querySelector("header");
  if (scrollY >= 300) {
    header.classList.add("downHeader");
    header.style.boxShadow = '0 -15px 50px 1px rgba(0, 0, 00, 0.2)'
  } else if (scrollY <= 300) {
    header.classList.remove("downHeader");
    header.style.boxShadow = '0 0 0 0'
  }
});
