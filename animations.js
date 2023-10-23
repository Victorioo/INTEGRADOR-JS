window.addEventListener("scroll", () => {
  let header = document.querySelector("header");
  header.classList.toggle("downHeader", scrollY >= 300);
});

const cursor = document.querySelector(".custom-cursor");