import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderConfirmation from '../pages/OrderConfirmation';

export const routes = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: Home,
    showInNav: false
  },
  {
    id: 'shop',
    label: 'Shop',
    path: '/shop',
    icon: 'Store',
    component: Shop,
    showInNav: true
  },
  {
    id: 'categories',
    label: 'Categories',
    path: '/categories',
    icon: 'Grid3X3',
    component: Shop,
    showInNav: true
  },
  {
    id: 'productDetail',
    label: 'Product',
    path: '/product/:id',
    icon: 'Package',
    component: ProductDetail,
    showInNav: false
  },
  {
    id: 'cart',
    label: 'Cart',
    path: '/cart',
    icon: 'ShoppingCart',
    component: Cart,
    showInNav: false
  },
  {
    id: 'checkout',
    label: 'Checkout',
    path: '/checkout',
    icon: 'CreditCard',
    component: Checkout,
    showInNav: false
  },
  {
    id: 'order-confirmation',
    label: 'Order Confirmation',
    path: '/order-confirmation/:orderId',
    icon: 'CheckCircle',
    component: OrderConfirmation,
    showInNav: false
  }
];

export const navigationRoutes = routes.filter(route => route.showInNav);