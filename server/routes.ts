import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// JWT Secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Extended Request interface to include user
interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
    email: string;
    isAdmin: boolean;
  };
}

// JWT Middleware
const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Admin middleware
const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  
  // ===== AUTHENTICATION ROUTES =====
  
  // Register
  app.post("/api/signup", async (req: Request, res: Response) => {
    try {
      const { username, email, name, password, phone } = req.body;

      // Validation
      if (!username || !email || !name || !password) {
        return res.status(400).json({ message: "Username, email, name, and password are required" });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username) || await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user
      const user = await storage.createUser({
        username,
        email,
        name,
        password: hashedPassword,
        phone
      });

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email, isAdmin: user.isAdmin },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          phone: user.phone,
          isAdmin: user.isAdmin
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // Login
  app.post("/api/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Find user
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email, isAdmin: user.isAdmin },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          phone: user.phone,
          isAdmin: user.isAdmin
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // Get user profile
  app.get("/api/user/profile", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const user = await storage.getUser(req.user!.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        phone: user.phone,
        addresses: user.addresses,
        isAdmin: user.isAdmin
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // Update user profile
  app.put("/api/user/update", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const { name, phone, addresses } = req.body;
      
      const updatedUser = await storage.updateUser(req.user!.id, {
        name,
        phone,
        addresses
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        message: "Profile updated successfully",
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
          email: updatedUser.email,
          name: updatedUser.name,
          phone: updatedUser.phone,
          addresses: updatedUser.addresses,
          isAdmin: updatedUser.isAdmin
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // ===== PRODUCT ROUTES =====

  // Get all products
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const { category, featured } = req.query;
      
      let products;
      if (category) {
        products = await storage.getProductsByCategory(category as string);
      } else if (featured === 'true') {
        products = await storage.getFeaturedProducts();
      } else {
        products = await storage.getProducts();
      }

      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // Get single product
  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProduct(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // Create product (Admin only)
  app.post("/api/products", authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
      const { title, description, price, imageUrl, tags, stock, category, featured } = req.body;

      if (!title || !description || !price || !imageUrl) {
        return res.status(400).json({ message: "Title, description, price, and imageUrl are required" });
      }

      const product = await storage.createProduct({
        title,
        description,
        price,
        imageUrl,
        tags: tags || [],
        stock: stock || 0,
        category: category || 'polaroid',
        featured: featured || false
      });

      res.status(201).json({
        message: "Product created successfully",
        product
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // Update product (Admin only)
  app.put("/api/products/:id", authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;

      const product = await storage.updateProduct(id, updates);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({
        message: "Product updated successfully",
        product
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // Delete product (Admin only)
  app.delete("/api/products/:id", authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProduct(id);

      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // ===== CART ROUTES =====

  // Get user's cart
  app.get("/api/cart", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      let cart = await storage.getCart(req.user!.id);
      
      if (!cart) {
        cart = await storage.createCart(req.user!.id);
      }

      const items = await storage.getCartItems(cart.id);
      const total = items.reduce((sum, item) => sum + (parseFloat(item.product.price as string) * item.quantity), 0);

      res.json({
        cart,
        items,
        total: total.toFixed(2)
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // Add item to cart
  app.post("/api/cart/add", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const { productId, quantity = 1 } = req.body;

      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      // Check if product exists
      const product = await storage.getProduct(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Check stock
      if (product.stock < quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }

      // Get or create cart
      let cart = await storage.getCart(req.user!.id);
      if (!cart) {
        cart = await storage.createCart(req.user!.id);
      }

      // Add item to cart
      const cartItem = await storage.addCartItem(cart.id, productId, quantity);

      res.json({
        message: "Item added to cart",
        cartItem
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // Update cart item quantity
  app.put("/api/cart/update", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const { productId, quantity } = req.body;

      if (!productId || quantity === undefined) {
        return res.status(400).json({ message: "Product ID and quantity are required" });
      }

      const cart = await storage.getCart(req.user!.id);
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      if (quantity === 0) {
        await storage.removeCartItem(cart.id, productId);
        return res.json({ message: "Item removed from cart" });
      }

      const cartItem = await storage.updateCartItem(cart.id, productId, quantity);

      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      res.json({
        message: "Cart updated",
        cartItem
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // Remove item from cart
  app.delete("/api/cart/remove/:productId", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const productId = parseInt(req.params.productId);

      const cart = await storage.getCart(req.user!.id);
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const removed = await storage.removeCartItem(cart.id, productId);

      if (!removed) {
        return res.status(404).json({ message: "Item not found in cart" });
      }

      res.json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // ===== ORDER ROUTES =====

  // Create order
  app.post("/api/order", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const { shippingAddress } = req.body;

      if (!shippingAddress) {
        return res.status(400).json({ message: "Shipping address is required" });
      }

      // Get user's cart
      const cart = await storage.getCart(req.user!.id);
      if (!cart) {
        return res.status(400).json({ message: "Cart not found" });
      }

      const cartItems = await storage.getCartItems(cart.id);
      if (cartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      // Calculate total and prepare order items
      let total = 0;
      const orderItems = cartItems.map(item => {
        const price = parseFloat(item.product.price as string);
        total += price * item.quantity;
        return {
          productId: item.productId,
          quantity: item.quantity,
          price
        };
      });

      // Create order
      const order = await storage.createOrder(req.user!.id, total, shippingAddress, orderItems);

      // Clear cart
      await storage.clearCart(cart.id);

      // Update product stock
      for (const item of cartItems) {
        const product = await storage.getProduct(item.productId);
        if (product) {
          await storage.updateProduct(item.productId, {
            stock: product.stock - item.quantity
          });
        }
      }

      res.status(201).json({
        message: "Order created successfully",
        order
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // Get user's order history
  app.get("/api/order/history", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const orders = await storage.getUserOrders(req.user!.id);
      
      // Get order items for each order
      const ordersWithItems = await Promise.all(
        orders.map(async (order) => {
          const items = await storage.getOrderItems(order.id);
          return { ...order, items };
        })
      );

      res.json(ordersWithItems);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // Get single order
  app.get("/api/order/:id", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const order = await storage.getOrder(id);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Check if user owns this order (or is admin)
      if (order.userId !== req.user!.id && !req.user!.isAdmin) {
        return res.status(403).json({ message: "Access denied" });
      }

      const items = await storage.getOrderItems(order.id);

      res.json({
        ...order,
        items
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // Update order status (Admin only)
  app.put("/api/order/:id/status", authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const order = await storage.updateOrderStatus(id, status);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.json({
        message: "Order status updated",
        order
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
