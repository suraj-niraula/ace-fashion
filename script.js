import { products } from "./data/product.js";
import { currencyFormatter } from "./utils/currencyFormatter.js";
import { cart, addToCart } from "./data/cart.js";

let menu = document.querySelector("#menu-icon");
let navmenu = document.querySelector(".nav-menu");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navmenu.classList.toggle("open");
};

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
      <div class="img-thumbnail">
      <img class="thumbz" src="${product.image}" alt="" />
      <div class="product-promo">
        <h5>New</h5>
      </div>
      <div class="wishlist">
        <i class="bx bx-heart"></i>
      </div>
      <div class="thumbnail-description">
        <h4>${product.name}</h4>
        <p>$${currencyFormatter(product.priceCents)}</p>
        <button class="add-to-cart-button js-add-to-cart-button"
        data-product-id="${product.id}">Add to cart</button>
      </div>
      </div>
      
      `;
});

document.querySelector(".js-collections").innerHTML = productsHTML;

function totalCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    totalCartQuantity();
  });
});
