const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class OrderService {
  constructor() {
    this.orders = JSON.parse(localStorage.getItem('marketflow_orders') || '[]');
  }

  saveOrders() {
    localStorage.setItem('marketflow_orders', JSON.stringify(this.orders));
  }

  generateOrderId() {
    return 'ORD-' + Date.now().toString().slice(-6).toUpperCase();
  }

  generateTrackingNumber() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async getAll() {
    await delay(300);
    return [...this.orders];
  }

  async getById(orderId) {
    await delay(200);
    const order = this.orders.find(o => o.orderId === orderId);
    if (!order) {
      throw new Error('Order not found');
    }
    return { ...order };
  }

  async create(orderData) {
    await delay(800); // Simulate processing time
    const newOrder = {
      ...orderData,
      orderId: this.generateOrderId(),
      trackingNumber: this.generateTrackingNumber(),
      status: 'Processing',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + (5 * 24 * 60 * 60 * 1000)).toISOString() // 5 days from now
    };

    this.orders.push(newOrder);
    this.saveOrders();
    return { ...newOrder };
  }

  async update(orderId, updates) {
    await delay(400);
    const orderIndex = this.orders.findIndex(o => o.orderId === orderId);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    
    this.orders[orderIndex] = { ...this.orders[orderIndex], ...updates };
    this.saveOrders();
    return { ...this.orders[orderIndex] };
  }

  async updateStatus(orderId, status) {
    await delay(300);
    return this.update(orderId, { status });
  }

  async delete(orderId) {
    await delay(300);
    const orderIndex = this.orders.findIndex(o => o.orderId === orderId);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    
    this.orders.splice(orderIndex, 1);
    this.saveOrders();
    return { success: true };
  }
}

export default new OrderService();