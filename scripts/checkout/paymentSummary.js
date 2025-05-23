import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import currencyFormatter from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let ShippingPriceCents = 0;

  let cartItems = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);

    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    ShippingPriceCents += deliveryOption.priceCents;

    cartItems += cartItem.quantity;
  });

  const totalBeforeTaxCents = productPriceCents + ShippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = ` 
  <div class="payment-summary-title">Order Summary</div>
  <div class="payment-summary-row">
  <div>Items (${cartItems}):</div>
  <div class="payment-summary-money">
    ${currencyFormatter(productPriceCents)}
  </div>
</div>

<div class="payment-summary-row">
  <div>Shipping &amp; handling:</div>
  <div class="payment-summary-money">${currencyFormatter(
    ShippingPriceCents
  )}</div>
</div>

<div class="payment-summary-row subtotal-row">
  <div>Total before tax:</div>
  <div class="payment-summary-money">${currencyFormatter(
    totalBeforeTaxCents
  )}</div>
</div>

<div class="payment-summary-row">
  <div>Estimated tax (10%):</div>
  <div class="payment-summary-money">${currencyFormatter(taxCents)}</div>
</div>

<div class="payment-summary-row total-row">
  <div>Order total:</div>
  <div class="payment-summary-money">${currencyFormatter(totalCents)}</div>
</div>

<button class="place-order-button button-primary js-place-order-button">
  Place your order
</button>
`;

document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  document.querySelector(".js-place-order-button").addEventListener("click" , async () => {

    try {

      const response = await fetch("https://supersimplebackend.dev/orders", {
        
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cart: cart,
        }),
      })

      const order = await response.json();
      addOrder(order);
      
    } catch (error) {  
      console.error("Error placing order:", error);
    }

    window.location.href = "orders.html";
}
  )
}