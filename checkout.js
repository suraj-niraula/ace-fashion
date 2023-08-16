import { products } from "./data/product.js";
import { addToCart, cart, removeFromCart } from "./data/cart.js";
import { currencyFormatter } from "./utils/currencyFormatter.js";

let productSummaryHTML = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  //   console.log(matchingProduct);

  productSummaryHTML += `
        <div class="item-description js-item-description-${matchingProduct.id}">
          <div class="left-part">
            <img src="${matchingProduct.image}" alt="" />
          </div>
          <div class="right-part">
            <p class="product-name">${matchingProduct.name}</p>
            <div class="quantity-container">
              <p>Quantity: ${cartItem.quantity}</p>
              <p class="delete-quantity-link link-primary js-delete-quantity"
              data-product-id=${matchingProduct.id}>Delete</p>
            </div>
            <br />
            <p class="product-name">$${currencyFormatter(
              matchingProduct.priceCents
            )}</p>
          </div>
        </div>
        `;
});

document.querySelector(".js-ordered-items").innerHTML = productSummaryHTML;

document.querySelectorAll(".js-delete-quantity").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;

    removeFromCart(productId);

    const container = document.querySelector(
      `.js-item-description-${productId}`
    );
    container.remove();
  });
});
