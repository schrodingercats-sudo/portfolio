import { 
  users, 
  products, 
  carts, 
  cartItems, 
  orders, 
  orderItems,
  type User, 
  type InsertUser, 
  type Product, 
  type InsertProduct, 
  type Cart, 
  type CartItem, 
  type Order, 
  type OrderItem 
} from "@shared/schema";

// Extended interface for e-commerce operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  
  // Product operations
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<Product>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Cart operations
  getCart(userId: number): Promise<Cart | undefined>;
  createCart(userId: number): Promise<Cart>;
  getCartItems(cartId: number): Promise<(CartItem & { product: Product })[]>;
  addCartItem(cartId: number, productId: number, quantity: number): Promise<CartItem>;
  updateCartItem(cartId: number, productId: number, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(cartId: number, productId: number): Promise<boolean>;
  clearCart(cartId: number): Promise<boolean>;
  
  // Order operations
  getOrder(id: number): Promise<Order | undefined>;
  getUserOrders(userId: number): Promise<Order[]>;
  createOrder(userId: number, total: number, shippingAddress: string, items: { productId: number, quantity: number, price: number }[]): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  getOrderItems(orderId: number): Promise<(OrderItem & { product: Product })[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private carts: Map<number, Cart>;
  private cartItems: Map<number, CartItem>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private currentUserId: number;
  private currentProductId: number;
  private currentCartId: number;
  private currentCartItemId: number;
  private currentOrderId: number;
  private currentOrderItemId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.carts = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentCartId = 1;
    this.currentCartItemId = 1;
    this.currentOrderId = 1;
    this.currentOrderItemId = 1;
    
    // Initialize with some sample products
    this.initializeSampleProducts();
  }

  private initializeSampleProducts() {
    const sampleProducts = [
      {
        title: "Vintage Sunset Polaroid",
        description: "A beautiful vintage polaroid capturing the perfect sunset moment. Warm tones and nostalgic vibes.",
        price: "24.99",
        imageUrl: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&h=400&fit=crop",
        tags: ["vintage", "sunset", "warm", "retro"],
        stock: 15,
        category: "polaroid",
        featured: true
      },
      {
        title: "Ocean Wave Memories",
        description: "Capturing the serene beauty of ocean waves. Perfect for beach lovers and nature enthusiasts.",
        price: "29.99",
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=400&fit=crop",
        tags: ["ocean", "waves", "blue", "nature"],
        stock: 20,
        category: "polaroid",
        featured: true
      },
      {
        title: "City Lights Night",
        description: "Urban nightlife captured in a single frame. Neon lights and city energy.",
        price: "27.99",
        imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=400&fit=crop",
        tags: ["city", "night", "neon", "urban"],
        stock: 12,
        category: "polaroid",
        featured: false
      },
      {
        title: "Forest Path Discovery",
        description: "A mysterious forest path beckoning adventure. Green tones and natural beauty.",
        price: "22.99",
        imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
        tags: ["forest", "nature", "green", "adventure"],
        stock: 18,
        category: "polaroid",
        featured: false
      },
      {
        title: "Mountain Peak Serenity",
        description: "Breathtaking mountain views captured at the perfect moment. Majesty and tranquility.",
        price: "32.99",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
        tags: ["mountain", "peaks", "nature", "serenity"],
        stock: 8,
        category: "polaroid",
        featured: true
      },
      {
        title: "Cozy Coffee Corner",
        description: "Perfect morning coffee moment. Warm, cozy, and inviting atmosphere.",
        price: "19.99",
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
        tags: ["coffee", "cozy", "morning", "warm"],
        stock: 25,
        category: "polaroid",
        featured: false
      }
    ];

    sampleProducts.forEach(product => {
      const id = this.currentProductId++;
      const newProduct: Product = {
        ...product,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
        // Convert string price to match schema
        price: product.price as any,
        tags: product.tags,
        stock: product.stock,
        category: product.category,
        featured: product.featured
      };
      this.products.set(id, newProduct);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      addresses: [],
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userUpdate: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userUpdate, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Product operations
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.featured);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.category === category);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = {
      ...insertProduct,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, productUpdate: Partial<Product>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct = { ...product, ...productUpdate, updatedAt: new Date() };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  // Cart operations
  async getCart(userId: number): Promise<Cart | undefined> {
    return Array.from(this.carts.values()).find(c => c.userId === userId);
  }

  async createCart(userId: number): Promise<Cart> {
    const id = this.currentCartId++;
    const cart: Cart = {
      id,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.carts.set(id, cart);
    return cart;
  }

  async getCartItems(cartId: number): Promise<(CartItem & { product: Product })[]> {
    const items = Array.from(this.cartItems.values()).filter(item => item.cartId === cartId);
    const itemsWithProducts = items.map(item => {
      const product = this.products.get(item.productId);
      return { ...item, product: product! };
    }).filter(item => item.product);
    return itemsWithProducts;
  }

  async addCartItem(cartId: number, productId: number, quantity: number): Promise<CartItem> {
    // Check if item already exists
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.cartId === cartId && item.productId === productId
    );

    if (existingItem) {
      // Update quantity
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + quantity };
      this.cartItems.set(existingItem.id, updatedItem);
      return updatedItem;
    } else {
      // Create new item
      const id = this.currentCartItemId++;
      const cartItem: CartItem = {
        id,
        cartId,
        productId,
        quantity,
        createdAt: new Date()
      };
      this.cartItems.set(id, cartItem);
      return cartItem;
    }
  }

  async updateCartItem(cartId: number, productId: number, quantity: number): Promise<CartItem | undefined> {
    const item = Array.from(this.cartItems.values()).find(
      item => item.cartId === cartId && item.productId === productId
    );
    
    if (!item) return undefined;
    
    const updatedItem = { ...item, quantity };
    this.cartItems.set(item.id, updatedItem);
    return updatedItem;
  }

  async removeCartItem(cartId: number, productId: number): Promise<boolean> {
    const item = Array.from(this.cartItems.values()).find(
      item => item.cartId === cartId && item.productId === productId
    );
    
    if (!item) return false;
    
    return this.cartItems.delete(item.id);
  }

  async clearCart(cartId: number): Promise<boolean> {
    const items = Array.from(this.cartItems.values()).filter(item => item.cartId === cartId);
    items.forEach(item => this.cartItems.delete(item.id));
    return true;
  }

  // Order operations
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(o => o.userId === userId);
  }

  async createOrder(userId: number, total: number, shippingAddress: string, items: { productId: number, quantity: number, price: number }[]): Promise<Order> {
    const orderId = this.currentOrderId++;
    const order: Order = {
      id: orderId,
      userId,
      total: total.toString() as any,
      status: "pending",
      shippingAddress,
      paymentStatus: "pending",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.orders.set(orderId, order);

    // Create order items
    items.forEach(item => {
      const orderItemId = this.currentOrderItemId++;
      const orderItem: OrderItem = {
        id: orderItemId,
        orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price.toString() as any,
        createdAt: new Date()
      };
      this.orderItems.set(orderItemId, orderItem);
    });

    return order;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder = { ...order, status, updatedAt: new Date() };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async getOrderItems(orderId: number): Promise<(OrderItem & { product: Product })[]> {
    const items = Array.from(this.orderItems.values()).filter(item => item.orderId === orderId);
    const itemsWithProducts = items.map(item => {
      const product = this.products.get(item.productId);
      return { ...item, product: product! };
    }).filter(item => item.product);
    return itemsWithProducts;
  }
}

export const storage = new MemStorage();
