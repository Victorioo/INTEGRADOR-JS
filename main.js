const objectData = [
  {
    id: 1,
    title: "Fenty",
    description:
      "Replenish your skin before bed, no matter what time of day, with this luxurious hydrating gel cream, specially designed by Rihanna for her evening beauty routine. - The rich and light gel cream moisturizes the skin immediately and for 8 hours. - Our ultra-hydrating cream harnesses the benefits of Hyaluronic Acid and the intensely hydrating properties of Kalahari Melon Oil and Baobab to lock in moisture and restore elasticity to the skin.- Wrinkles and fine lines fade instantly and over time",
    price: 23.95,
    image1: "https://vimcosmo.com/pics/fenty-1.webp",
    image2: "https://vimcosmo.com/pics/fenty-2.webp",
    image3: "https://vimcosmo.com/pics/fenty-2.webp",
  },
  {
    id: 2,
    title: "Ilia",
    description: "",
    price: 38.65,
    image1: "https://vimcosmo.com/pics/ilia-1.webp",
    image2: "https://vimcosmo.com/pics/ilia-2.webp",
    image3: "https://vimcosmo.com/pics/fenty-2.webp",
  },
  {
    id: 3,
    title: "Kenzoki hydration",
    description:
      "Replenish your skin before bed, no matter what time of day, with this luxurious hydrating gel cream, specially designed by Rihanna for her evening beauty routine. - The rich and light gel cream moisturizes the skin immediately and for 8 hours. - Our ultra-hydrating cream harnesses the benefits of Hyaluronic Acid and the intensely hydrating properties of Kalahari Melon Oil and Baobab to lock in moisture and restore elasticity to the skin.- Wrinkles and fine lines fade instantly and over time",
    price: 23.95,
    image1: "https://vimcosmo.com/pics/kenzoki-1.webp",
    image2: "https://vimcosmo.com/pics/kenzoki-2.webp",
    image3: "https://vimcosmo.com/pics/kenzoki-3.webp",
  },
  {
    id: 4,
    title: "Pixi",
    description:
      "Replenish your skin before bed, no matter what time of day, with this luxurious hydrating gel cream, specially designed by Rihanna for her evening beauty routine. - The rich and light gel cream moisturizes the skin immediately and for 8 hours. - Our ultra-hydrating cream harnesses the benefits of Hyaluronic Acid and the intensely hydrating properties of Kalahari Melon Oil and Baobab to lock in moisture and restore elasticity to the skin.- Wrinkles and fine lines fade instantly and over time",
    price: 23.95,
    image1: "https://vimcosmo.com/pics/pixi-1.webp",
    image2: "https://vimcosmo.com/pics/pixi-2.webp",
    image3: "https://vimcosmo.com/pics/pixi-3.webp",
  },
];

let productsContainer = document.querySelector(".products__container");
const cartIcon = document.querySelector(".cart_icon");
const cartContainer = document.querySelector(".cart_container");
const addButton = document.querySelector('.btn-add')

// Funciones carrito:

const openCart = () => {
  cartContainer.classList.toggle("open");
};

const addToCart = (event) => {
  if(!event.target.classList.contains('btn-add')) return;
  
  const product = event.target.dataset;
  
  if (false) { // TODO: Cambiar el false por una funcion o constante, que verifique si el producto ya esta en el carrito

  }

};

// Función para renderizar todos los productos

function showProducts() {
  productsContainer.innerHTML = objectData
    .map((product) => {
      const { id, title, description, price, image1, image2, image3 } = product;
      console.log(product);
      return `<div class="product">
      <img src="${image1}"/>
      <h3>${title}</h3>
      <p>${price}</p>
      <button class="btn-add"
      data-id="${id}"
      data-name="${title}"
      data-img="${image2}"
      >
      Add
      </button>
      </div>`;
    })
    .join("");
}

function init() {
  showProducts();
  cartIcon.addEventListener("click", openCart);
  productsContainer.addEventListener("click", addToCart)
}

init();
