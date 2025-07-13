const API_BASE_URL = '/api';

// Types for API responses
interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  phone?: string;
  addresses?: string[];
  isAdmin: boolean;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  tags: string[];
  stock: number;
  category: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product: Product;
}

interface Cart {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface Order {
  id: number;
  userId: number;
  total: string;
  status: string;
  shippingAddress: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  items?: Array<{
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: string;
    product: Product;
  }>;
}

export type { User, Product, CartItem, Cart, Order };

class ApiClient {
  private getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Authentication
  async signup(data: {
    username: string;
    email: string;
    name: string;
    password: string;
    phone?: string;
  }): Promise<{ token: string; user: User }> {
    return this.request('/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }): Promise<{ token: string; user: User }> {
    return this.request('/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProfile(): Promise<User> {
    return this.request('/user/profile');
  }

  async updateProfile(data: {
    name?: string;
    phone?: string;
    addresses?: string[];
  }): Promise<{ user: User }> {
    return this.request('/user/update', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Products
  async getProducts(params?: { category?: string; featured?: boolean }): Promise<Product[]> {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.featured) searchParams.append('featured', 'true');
    
    const query = searchParams.toString();
    return this.request(`/products${query ? `?${query}` : ''}`);
  }

  async getProduct(id: number): Promise<Product> {
    return this.request(`/products/${id}`);
  }

  async createProduct(data: {
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    tags?: string[];
    stock?: number;
    category?: string;
    featured?: boolean;
  }): Promise<{ product: Product }> {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProduct(id: number, data: Partial<Product>): Promise<{ product: Product }> {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(id: number): Promise<{ message: string }> {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Cart
  async getCart(): Promise<{ cart: Cart; items: CartItem[]; total: string }> {
    return this.request('/cart');
  }

  async addToCart(productId: number, quantity: number = 1): Promise<{ cartItem: CartItem }> {
    return this.request('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async updateCartItem(productId: number, quantity: number): Promise<{ cartItem?: CartItem; message: string }> {
    return this.request('/cart/update', {
      method: 'PUT',
      body: JSON.stringify({ productId, quantity }),
    });
  }

  async removeFromCart(productId: number): Promise<{ message: string }> {
    return this.request(`/cart/remove/${productId}`, {
      method: 'DELETE',
    });
  }

  // Orders
  async createOrder(shippingAddress: string): Promise<{ order: Order }> {
    return this.request('/order', {
      method: 'POST',
      body: JSON.stringify({ shippingAddress }),
    });
  }

  async getOrderHistory(): Promise<Order[]> {
    return this.request('/order/history');
  }

  async getOrder(id: number): Promise<Order> {
    return this.request(`/order/${id}`);
  }

  async updateOrderStatus(id: number, status: string): Promise<{ order: Order }> {
    return this.request(`/order/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }
}

export const api = new ApiClient();