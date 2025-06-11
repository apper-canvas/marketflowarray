import HomePage from '@/components/pages/HomePage';
import ShopPage from '@/components/pages/ShopPage';
import ProductDetailPage from '@/components/pages/ProductDetailPage';
import CartPage from '@/components/pages/CartPage';
import CheckoutPage from '@/components/pages/CheckoutPage';
import OrderConfirmationPage from '@/components/pages/OrderConfirmationPage';

export const routes = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
component: HomePage,
    showInNav: false
  },
  {
    id: 'shop',
    label: 'Shop',
    path: '/shop',
    icon: 'Store',
component: ShopPage,
    showInNav: true
  },
  {
    id: 'categories',
    label: 'Categories',
    path: '/categories',
    icon: 'Grid3X3',
component: ShopPage,
    showInNav: true
  },
  {
    id: 'productDetail',
    label: 'Product',
    path: '/product/:id',
    icon: 'Package',
component: ProductDetailPage,
    showInNav: false
  },
  {
    id: 'cart',
    label: 'Cart',
    path: '/cart',
    icon: 'ShoppingCart',
component: CartPage,
    showInNav: false
  },
  {
    id: 'checkout',
    label: 'Checkout',
    path: '/checkout',
    icon: 'CreditCard',
component: CheckoutPage,
    showInNav: false
  },
  {
    id: 'order-confirmation',
    label: 'Order Confirmation',
    path: '/order-confirmation/:orderId',
    icon: 'CheckCircle',
component: OrderConfirmationPage,
    showInNav: false
  }
];

export const navigationRoutes = routes.filter(route => route.showInNav);