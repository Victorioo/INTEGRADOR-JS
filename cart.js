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
const emptyCartButton = document.querySelector(".empty_cart")

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para actualizar el estado del carrito

const updateBubble = () => {
  cartBubble.textContent = cart.reduce((acc, curr) => acc + curr.quantity, 0);
};

const showCartTotal = () => {
  priceText.innerHTML = `$${cartTotal().toFixed(2)}`;
};

const cartTotal = () => {
  return cart.reduce(
    (acc, curr) => acc + Number(curr.price) * curr.quantity,
    0
  );
};

const updateCartState = () => {
  renderCart();
  updateBubble();
  cartTotal();
  showCartTotal();
  btnStatus();
};

const openCart = () => {
  openCartIcon.classList.toggle("open");
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

const addUnitProduct = (product) => {
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct
  );

  updateCartState();
};

const isExistingProduct = (product) => {
  return cart.find((item) => item.id == product.id);
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

function showProducts() {
  productsContainer.innerHTML = objectData
    .map((product) => {
      const { id, title, price, image1 } = product;

      return `
      <div class="product">
       <img src="${image1}" alt="${title}" class="product_image" data-id="${id}"/>
       <h3>${title}</h3>
       <div class="product_add">
       <span>$${price}</span>
       <button class="btn-add"
       data-id="${id}"
       data-name="${title}"
       data-img="${image1}"
       data-price="${price}"
       >
       Add
       </button>
       </div>
      </div>`;
    })
    .join("");
}

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

const alternateProductImages = () => {
  const images = document.querySelectorAll(".product_image");
  images.forEach((image) => {
    const searchInfo = toGetId => objectData.find( item => item.id === toGetId );

    image.addEventListener("mouseover",(event) => image.src = searchInfo(event.target.dataset.id).secondImage);

    image.addEventListener("mouseout", event => image.src = searchInfo(event.target.dataset.id).image1);
  });

  checkoutBtn.addEventListener("click", successPurchase);
}

const emptyCart = () => {
  cart = [];
  localStorage.removeItem('cart');
  updateCartState();
}

function init() {
  updateBubble();
  updateCartState();
  showProducts();
  cartIcon.addEventListener("click", openCart);
  productsContainer.addEventListener("click", addProduct);
  document.addEventListener("DOMContentLoaded", renderCart);
  cartContainer.addEventListener("click", quantityHandler);
  // Funcion que al hacer scroll cierra el carrito
  document.addEventListener("scroll", () =>
    openCartIcon.classList.remove("open")
  );
  alternateProductImages()
  emptyCartButton.addEventListener('click', emptyCart)
}

init();

