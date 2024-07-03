import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  addToCart(product: any, quantity: number) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    let existingItemIndex = cartItems.findIndex((item: { product: { id: any; }; }) => item.product.id === product.id);
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      cartItems.push({ product, quantity });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
  getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems') || '[]');
  }

}
