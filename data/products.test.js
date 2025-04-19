import { Product, Clothing, Appliance } from "./products.js";
import { describe, test, expect, beforeEach } from "vitest";

describe('Product class', () => {
    let product;

    beforeEach(() => {
        product = new Product({
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: { stars: 4.5, count: 87 },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        });
    });

    test('should have correct properties', () => {
        expect(product.id).toBe("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(product.image).toBe("images/products/athletic-cotton-socks-6-pairs.jpg");
        expect(product.priceCents).toBe(1090);
    });

    test('getPrice() should return formatted price', () => {
        expect(product.getPrice()).toBe("10.90");
    });

    test('getStarUrl() should return correct rating image URL', () => {
        expect(product.getStarUrl()).toBe("images/ratings/rating-45.png");
    });
});

describe('Clothing class', () => {
    let clothing;

    beforeEach(() => {
        clothing = new Clothing({
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: { stars: 4.5, count: 56 },
            priceCents: 799,
            keywords: ["tshirts", "apparel", "mens"],
            sizeChartLink: "images/clothing-size-chart.png"
        });
    });

    test('should inherit from Product', () => {
        expect(clothing).toBeInstanceOf(Product);
    });

    test('should have sizeChartLink property', () => {
        expect(clothing.sizeChartLink).toBe("images/clothing-size-chart.png");
    });

    test('extraInfoHTML() should return size chart link', () => {
        expect(clothing.extraInfoHTML()).toContain("Size chart");
        expect(clothing.extraInfoHTML()).toContain("images/clothing-size-chart.png");
    });
});

describe('Appliance class', () => {
    let appliance;

    beforeEach(() => {
        appliance = new Appliance({
            id: "02e3a47e-dd68-467e-9f71-8bf6f723fdae",
            image: "images/products/blackout-curtains-black.jpg",
            name: "Blackout Curtains",
            rating: { stars: 4.5, count: 363 },
            priceCents: 3099,
            keywords: ["bedroom", "home"],
            instructionsLink: "images/appliance-instructions.pdf",
            warrantyLink: "images/appliance-warranty.pdf"
        });
    });

    test('should inherit from Product', () => {
        expect(appliance).toBeInstanceOf(Product);
    });

    test('should have appliance-specific properties', () => {
        expect(appliance.instructionsLink).toBe("images/appliance-instructions.pdf");
        expect(appliance.warrantyLink).toBe("images/appliance-warranty.pdf");
    });

    test('extraInfoHTML() should return appliance info', () => {
        const html = appliance.extraInfoHTML();
        expect(html).toContain("Instructions");
        expect(html).toContain("Warranty");
    });
});