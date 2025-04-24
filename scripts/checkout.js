import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import {  loadProductsFetch } from "../data/products.js";
import { cart, loadCart } from "../data/cart.js";

renderCheckoutHeader();

async function loadPage() {

    try {
        
        await loadProductsFetch();
        await new Promise((resolve) => {

            loadCart(() => {
                // resolve the promise when the cart is loaded
                resolve("go to rendering");
            });
        }).then((resolvedValue) => {
            // resolve the promise when the cart is loaded
            console.log(resolvedValue);
        });
        
        renderOrderSummary();
        renderPaymentSummary(); 
    
    } catch (error) {
        console.error("Error loading page:", error);
    }

}

loadPage();

// Promise.all([
//    loadProductsFetch(),
//     new Promise((resolve) => {
//         loadCart(() => {
//                 // resolve the promise when the cart is loaded
//             resolve("go to rendering");
//             });
//         })
// ]).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary(); 
// })
