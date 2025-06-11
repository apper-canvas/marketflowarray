const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CartService {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('marketflow_cart') || '[]');
  }

  saveCart() {
    localStorage.setItem('marketflow_cart', JSON.stringify(this.cart));
  }

  async getCart() {
    await delay(200);
    return [...this.cart];
  }

  async addToCart(item) {
    await delay(300);
    const existingItemIndex = this.cart.findIndex(
      cartItem => cartItem.productId === item.productId && cartItem.size === item.size
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      this.cart[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item
      this.cart.push({
        ...item,
        id: Date.now().toString()
      });
    }

    this.saveCart();
    return [...this.cart];
  }

  async updateQuantity(productId, size, quantity) {
    await delay(200);
    const itemIndex = this.cart.findIndex(
      item => item.productId === productId && item.size === size
    );

    if (itemIndex === -1) {
      throw new Error('Item not found in cart');
    }

    if (quantity <= 0) {
      this.cart.splice(itemIndex, 1);
    } else {
      this.cart[itemIndex].quantity = quantity;
    }

    this.saveCart();
    return [...this.cart];
  }

  async removeFromCart(productId, size) {
    await delay(200);
    this.cart = this.cart.filter(
      item => !(item.productId === productId && item.size === size)
    );
    this.saveCart();
    return [...this.cart];
  }

  async clearCart() {
    await delay(200);
    this.cart = [];
    this.saveCart();
    return [];
  }

  async getCartTotal() {
    await delay(100);
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  async getCartItemCount() {
    await delay(100);
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }
}

export default new CartService();