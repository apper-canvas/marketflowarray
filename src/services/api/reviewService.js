import reviewData from '../mockData/reviews.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ReviewService {
  async getAll() {
    await delay(300);
    return [...reviewData];
  }

  async getById(id) {
    await delay(200);
    const review = reviewData.find(r => r.id === id);
    if (!review) {
      throw new Error('Review not found');
    }
    return { ...review };
  }

  async getByProductId(productId) {
    await delay(250);
    return reviewData.filter(r => r.productId === productId);
  }

  async create(reviewData) {
    await delay(500);
    const newReview = {
      ...reviewData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    return { ...newReview };
  }

  async update(id, updates) {
    await delay(400);
    const reviewIndex = reviewData.findIndex(r => r.id === id);
    if (reviewIndex === -1) {
      throw new Error('Review not found');
    }
    const updatedReview = { ...reviewData[reviewIndex], ...updates };
    return { ...updatedReview };
  }

  async delete(id) {
    await delay(300);
    const reviewIndex = reviewData.findIndex(r => r.id === id);
    if (reviewIndex === -1) {
      throw new Error('Review not found');
    }
    return { success: true };
  }
}

export default new ReviewService();