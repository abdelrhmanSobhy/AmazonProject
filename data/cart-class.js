class Cart {
    cartItems; // public
    #localStorageKey; // private

    constructor(localStorageKey){
      this.#localStorageKey = localStorageKey;
      this.#loadFromStorage();
    }
  
    #loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
      if (!this.cartItems) {
        this.cartItems = [
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 2,
            deliveryOptionId: "1",
          },
          {
            productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            quantity: 3,
            deliveryOptionId: "2",
          },
        ];
      }
    }
    saveToStorage() {
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }
    addToCart(productId) {
  
      let matchingItem;
  
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
  
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: "1",
        });
      }
  
      this.saveToStorage();
    }
    removeFromCart(productId) {
      const newCart = [];
  
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
  
      this.cartItems = newCart;
  
      this.saveToStorage();
    }
    updateQuantity(productId, newQuantity) {
      let matchingItem;
  
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) matchingItem = cartItem;
      });
  
      matchingItem.quantity = newQuantity;
  
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
        newQuantity;
  
      this.saveToStorage();
    }
    updateDeliveryOptionId(productId, deliveryOptionId) {
      let matchingItem;
  
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) matchingItem = cartItem;
      });
  
      matchingItem.deliveryOptionId = deliveryOptionId;
  
      this.saveToStorage();
    }
  };
  
