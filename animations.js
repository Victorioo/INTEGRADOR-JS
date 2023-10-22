window.addEventListener("scroll", () => {
  let header = document.querySelector("header");
  header.classList.toggle("downHeader", scrollY >= 300);
});

const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  if (e.target.classList.contains("product-img")) {
    cursor.classList.add("hover-product");
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
  } else {
    cursor.classList.remove("hover-product");
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
  }
});
