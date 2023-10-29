const openMenuBtn = document.querySelector(".menu_btn");
const header = document.querySelector("header");

openMenuBtn.addEventListener("click", () => {
  // Abrir el menu responsive en mobile
  openCartIcon.classList.remove('open');
  blurBackground.classList.remove('blur_background')
  openMenuBtn.classList.toggle('navbar_open');
  header.classList.toggle('responsive_open');
});

const headerAnimation = () => {
  // Función que mueve el header al scrollear

  if (scrollY >= 300) {
    header.classList.add("downHeader");
    header.style.boxShadow = "0 -15px 50px 1px rgba(0, 0, 00, 0.2)";
  } else if (scrollY <= 300) {
    header.classList.remove("downHeader");
    header.style.boxShadow = "0 0 0 0";
  }
};

// Funcion para el magnetismo en los items

window.addEventListener("scroll", headerAnimation);

const mm = new MagnetMouse({
  magnet: {
    element: ".magnet",
    distance: 5,
  },
});

const buttonMagnet = new MagnetMouse({
  magnet: {
    element: ".button_magnet",
    distance: 3,
  },
});

buttonMagnet.init();
mm.init();

// ----------
