import productData from '../mockData/products.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ProductService {
  async getAll() {
    await delay(300);
    return [...productData];
  }

  async getById(id) {
    await delay(200);
    const product = productData.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return { ...product };
  }

  async getByCategory(category) {
    await delay(300);
    return productData.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  async search(query) {
    await delay(400);
    const searchTerm = query.toLowerCase();
    return productData.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm)
    );
  }

  async create(productData) {
    await delay(500);
    const newProduct = {
      ...productData,
      id: Date.now().toString(),
    };
    return { ...newProduct };
  }

  async update(id, updates) {
    await delay(400);
    const productIndex = productData.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    const updatedProduct = { ...productData[productIndex], ...updates };
    return { ...updatedProduct };
  }

  async delete(id) {
    await delay(300);
    const productIndex = productData.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    return { success: true };
  }
}

export default new ProductService();