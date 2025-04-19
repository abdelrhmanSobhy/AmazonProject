import {
  cart,
  removeFromCart,
  // updateCartQuantity,
  updateDeliveryOptionId,
  updateQuantity,
} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import currencyFormatter from "../utils/money.js";

import {
  calculateDeliveryDate,
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {
  const cartSummary = document.querySelector(".js-order-summary");

  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    let matchingProduct = getProduct(cartItem.productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
      <div class="delivery-date">Delivery date: ${dateString}</div>
      
      <div class="cart-item-details-grid">
      <img
      class="product-image"
      src="${matchingProduct.image}"
      />
      
      <div class="cart-item-details ">
      <div class="product-name">
      ${matchingProduct.name}
      </div>
      <div class="product-price">$${matchingProduct.getPrice()}</div>
      <div class="product-quantity">
      <span> Quantity: <span class="quantity-label js-quantity-label-${
        matchingProduct.id
      }">${cartItem.quantity}</span></span>
        <span class = "update-quantity-link link-primary js-update-link" data-product-id = "${
          matchingProduct.id
        }">
          Update
          </span>
          <input class = "quantity-input js-quantity-input-${
            matchingProduct.id
          }">
            <span class="save-quantity-link link-primary js-save-link" data-product-id = "${
              matchingProduct.id
            }">save</span> 
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                matchingProduct.id
              }">
            Delete
            </span>
            </div>
            </div>
            
            <div class="delivery-options">
            <div class="delivery-options-title">
            Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
          </div>
          </div>
          </div>
          </div>`;
  });

  cartSummary.innerHTML = cartSummaryHTML;

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${currencyFormatter(deliveryOption.priceCents)} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += ` 
            <div class="delivery-option js-delivery-option"
            data-product-id = ${matchingProduct.id}
            data-delivery-Option-id = ${deliveryOption.id}
            >
            <input
            type="radio"
            ${isChecked ? "checked" : ""}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
            />
            <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-price">${priceString} Shipping</div>
            </div>
            </div>`;
    });

    return html;
  }

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      removeFromCart(productId);

      renderCheckoutHeader();
      // updateCartQuantity();
      renderPaymentSummary();
      renderOrderSummary();
    });
  });

  // updateCartQuantity();

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      const inputValue = Number(
        document.querySelector(`.js-quantity-input-${productId}`).value
      );

      if (inputValue < 0 || inputValue >= 1000) {
        alert("Quantity must be at least 0 and less than 1000");
        return;
      }

      updateQuantity(productId, inputValue);
      renderCheckoutHeader();
      renderPaymentSummary();
      // updateCartQuantity();

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove("is-editing-quantity");
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOptionId(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
