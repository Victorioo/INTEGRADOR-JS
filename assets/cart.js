let productsContainer = document.querySelector(".products__container");
const addButton = document.querySelector(".btn-add"); // Button añadir

// Selectores carrito:
const cartIcon = document.querySelector(".cart_icon"); // Icon, carrito
const cartContainer = document.querySelector(".cart_products");
const cartBubble = document.querySelector(".cart_bubble"); // Burbuja con cantidad de items
const cartProduct = document.querySelector(".cart_product"); // Producto
const priceText = document.querySelector(".price"); // Texto del precio total
const checkoutBtn = document.querySelector(".checkout-btn"); // Button finalizar compra
const openCartIcon = document.querySelector(".cart_container");
const emptyCartButton = document.querySelector(".empty_cart");
const showMoreBtn = document.querySelector(".show_more_btn");
const blurBackground = document.querySelector(".blur_on_cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para actualizar el estado del carrito

const openCart = () => {
  openMenuBtn.classList.remove('navbar_open')
  header.classList.remove('responsive_open')
  openCartIcon.classList.toggle("open");
  blurBackground.classList.toggle("blur_background");
};

const closeCartAndMenu = () => {
  openCartIcon.classList.remove("open");
  blurBackground.classList.remove("blur_background");
  openMenuBtn.classList.remove("navbar_open");
  header.classList.remove('responsive_open');
};

const updateBubble = () => {
  cartBubble.textContent = cart.reduce((acc, curr) => acc + curr.quantity, 0);
};

const cartTotal = () => {
  return cart.reduce(
    (acc, curr) => acc + Number(curr.price) * curr.quantity,
    0
  );
};

const showCartTotal = () => {
  priceText.innerHTML = `$${cartTotal().toFixed(2)}`;
};

const updateCartState = () => {
  renderCart();
  updateBubble();
  cartTotal();
  showCartTotal();
  btnStatus();
};

const createCartProductTemplate = (cartProduct) => {
  const { id, name, img, price, quantity } = cartProduct;

  return `
  <li class="cart_product">
   <img src="${img}" alt="${name}" />
   <div class="cart_info">
    <div class="cart_product_top">
      <h3>${name}</h3>
      <i class="fa-regular fa-trash-can trash_can" data-id="${id}"></i>
    </div>
    <div class="cart_product_bottom">
      <div>
       <button class="restHandler" data-id="${id}">-</button>
       <span>${quantity}</span>
       <button class="sumHandler" data-id="${id}">+</button>
        
      </div>
      <h3>$${price}</h3>
    </div>
    </div>
  </li>

`;
};

const btnStatus = () => {
  if (!cart.length) {
    checkoutBtn.classList.add("disabled");
  } else {
    checkoutBtn.classList.remove("disabled");
  }
};

const successPurchase = () => {
  if (!cart.length) return;
  else {
    checkoutBtn.innerHTML = '<span class="loader"></span>';
    setTimeout(() => {
      checkoutBtn.innerHTML = '<button class="checkout-btn">Checkout</button>';
    }, 3000);
  }
};

const renderCart = () => {
  if (!cart.length) {
    cartContainer.innerHTML = "<p>El carrito está vacío</p>";
  }
  cartContainer.innerHTML = cart.map(createCartProductTemplate).join("");
  localStorage.setItem("cart", JSON.stringify(cart));
};

const newCartProduct = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
  renderCart();
};

const isExistingProduct = (product) => {
  return cart.find((item) => item.id == product.id);
};

const addUnitProduct = (product) => {
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct
  );

  updateCartState();
};

const cartAnimation = () => {
  cartIcon.classList.add("animation");
  setTimeout(() => {
    cartIcon.classList.remove("animation");
  }, 400);
};

const addProduct = (event) => {
  if (!event.target.classList.contains("btn-add")) return;
  const product = event.target.dataset;

  if (isExistingProduct(product)) {
    addUnitProduct(product);
  } else {
    newCartProduct(product);
  }

  updateCartState();
  cartAnimation();
};

const productTemplate = (product) => {
  const { id, title, price, image1 } = product;

  return `
      <div class="product">
       <img src="${image1}" alt="${title}" class="product_image button_magnet" data-id="${id}"/>
       <h3>${title}</h3>
       <div class="product_add">
       <span>$${price}</span>
       <button class="btn-add button_magnet"
       data-id="${id}"
       data-name="${title}"
       data-img="${image1}"
       data-price="${price}"
       >
       Add
       </button>
       </div>
      </div>`;
};

const quantitySumHandler = (id) => {
  const existingCartProduct = cart.find((item) => item.id == id);
  addUnitProduct(existingCartProduct);
};

const removeProductFromCart = (existingCartProduct) => {
  cart = cart.filter((product) => product.id !== existingCartProduct.id);
  updateCartState();
};

const quantityRestHandler = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  if (existingCartProduct.quantity === 1) {
    removeProductFromCart(existingCartProduct);
  }
  substractUnit(existingCartProduct);
};

const substractUnit = (existingCartProduct) => {
  cart = cart.map((product) => {
    return product.id === existingCartProduct.id
      ? { ...product, quantity: Number(product.quantity) - 1 }
      : product;
  });
};

const quantityHandler = (e) => {
  if (e.target.classList.contains("sumHandler")) {
    quantitySumHandler(e.target.dataset.id);
  } else if (e.target.classList.contains("restHandler")) {
    quantityRestHandler(e.target.dataset.id);
  } else if (e.target.classList.contains("trash_can")) {
    removeProductFromCart(e.target.dataset);
  }

  updateCartState();
};

const alternateProductImages = (imagesArray) => {
  imagesArray.forEach((image) => {
    const searchInfo = (toGetId) => {
      return dataShowMore.products[0].find((item) => item.id === toGetId);
    };

    image.addEventListener("mouseover", (event) => {
      image.src = searchInfo(event.target.dataset.id).secondImage;
    });

    image.addEventListener("mouseout", (event) => {
      image.src = searchInfo(event.target.dataset.id).image1;
    });
  });

  checkoutBtn.addEventListener("click", successPurchase);
};

const emptyCart = () => {
  cart = [];
  localStorage.removeItem("cart");
  updateCartState();
};

const renderProducts = (productList) => {
  productsContainer.innerHTML += productList
    .map((item) => productTemplate(item))
    .join("");
};

const renderMoreProducts = () => {
  dataShowMore.current += 1;

  const isLastIndex = () => {
    return dataShowMore.current === dataShowMore.limit - 1;
  };

  let { products, current } = dataShowMore;

  renderProducts(products[current]);

  if (isLastIndex()) {
    showMoreBtn.classList.add("showing_more");
  }
};

function init() {
  renderProducts(dataShowMore.products[0]);
  updateBubble();
  updateCartState();
  cartIcon.addEventListener("click", openCart);
  productsContainer.addEventListener("click", addProduct);
  document.addEventListener("DOMContentLoaded", renderCart);
  cartContainer.addEventListener("click", quantityHandler);
  // Funcion que al hacer scroll cierra el carrito
  window.addEventListener("scroll", closeCartAndMenu);
  blurBackground.addEventListener("click", closeCartAndMenu);
  emptyCartButton.addEventListener("click", emptyCart);
  const images = document.querySelectorAll(".product_image");
  alternateProductImages(images);
  showMoreBtn.addEventListener("click", renderMoreProducts);
}

init();
