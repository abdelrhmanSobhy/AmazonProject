import currencyFormatter from "../scripts/utils/money.js";

export let products = [];

export function loadProductsFetch(){
  const promise = fetch(
    "https://supersimplebackend.dev/products")
  .then((response) => {
    return response.json()
  }).then((data) => {
    products = data.map((productDetails) => {
      if (productDetails.type === "clothing") {
        return new Clothing(productDetails);
      }
      if (productDetails.type === "appliance") {
        return new Appliance(productDetails);
      }
      return new Product(productDetails);
    })


  });
  console.log(products)
  return promise;
}


export function loadProducts(fun) {
 
  const xhr = new XMLHttpRequest();
  xhr.open("GET" , "https://supersimplebackend.dev/products") ; 
  xhr.send();

  xhr.addEventListener("load", () => {
     
    products = JSON.parse(xhr.response).map((productDetails) => {
        if (productDetails.type === "clothing") {
          return new Clothing(productDetails);
        }
        if (productDetails.type === "appliance") {
          return new Appliance(productDetails);
        }
        return new Product(productDetails);
      });;
      
      console.log("load products");
      fun();
    });
    
}


export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) matchingProduct = product;
  });

  return matchingProduct;
}

//converting object to class
export class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return currencyFormatter(this.priceCents);
  }

  extraInfoHTML() {
    return ``;
  }
}

export class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails); //to get parent methods and pro
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `<a href="${this.sizeChartLink}" target="_blank">Size chart</a>`;
  }
}

export class Appliance extends Product {
  instructionsLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML() {
    return `<a href="${this.instructionsLink}" target="_blank">Instructions</a> <a href="${this.warrantyLink}" target="_blank">Warranty</a>`;
  }
}




