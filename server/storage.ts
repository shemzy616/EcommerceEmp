import { users, products, type User, type InsertUser, type Product, type InsertProduct } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  sessionStore: session.Store;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(insertProduct: InsertProduct): Promise<Product>;
  updateProduct(id: number, insertProduct: InsertProduct): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
    this.seedProducts();
  }

  private async seedProducts() {
    const existingProducts = await this.getAllProducts();
    if (existingProducts.length === 0) {
      const mockProducts = [
        {
          name: "Premium Wireless Headphones",
          description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
          price: "299.99",
          imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
          stock: 50
        },
        {
          name: "Smart Fitness Watch",
          description: "Track your health and fitness with this advanced smartwatch featuring heart rate monitoring and GPS.",
          price: "199.99",
          imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
          stock: 75
        },
        {
          name: "Ultra HD 4K Camera",
          description: "Professional-grade camera with 4K video recording and advanced image stabilization.",
          price: "899.99",
          imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
          stock: 25
        },
        {
          name: "Designer Laptop Backpack",
          description: "Stylish and durable backpack with padded laptop compartment and multiple storage pockets.",
          price: "79.99",
          imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
          stock: 100
        },
        {
          name: "Portable Bluetooth Speaker",
          description: "Waterproof speaker with stunning 360-degree sound and 20-hour playtime.",
          price: "129.99",
          imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
          stock: 60
        },
        {
          name: "Mechanical Gaming Keyboard",
          description: "RGB backlit mechanical keyboard with customizable keys and premium switches.",
          price: "159.99",
          imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
          stock: 45
        }
      ];

      for (const product of mockProducts) {
        await this.createProduct(product);
      }
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user;
    } catch (error) {
      console.error('Error getting user by username:', error);
      throw error;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const [user] = await db.insert(users).values(insertUser).returning();
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      return await db.select().from(products);
    } catch (error) {
      console.error('Error getting all products:', error);
      throw error;
    }
  }

  async getProduct(id: number): Promise<Product | undefined> {
    try {
      const [product] = await db.select().from(products).where(eq(products.id, id));
      return product;
    } catch (error) {
      console.error('Error getting product:', error);
      throw error;
    }
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    try {
      const [product] = await db.insert(products).values(insertProduct).returning();
      return product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async updateProduct(id: number, insertProduct: InsertProduct): Promise<Product | undefined> {
    try {
      const [product] = await db
        .update(products)
        .set(insertProduct)
        .where(eq(products.id, id))
        .returning();
      return product;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      await db.delete(products).where(eq(products.id, id));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  async getActivePromotions(): Promise<Promotion[]> {
    try {
      return await db.select()
        .from(promotions)
        .where(eq(promotions.isActive, true));
    } catch (error) {
      console.error('Error getting promotions:', error);
      throw error;
    }
  }

  async createPromotion(insertPromotion: InsertPromotion): Promise<Promotion> {
    try {
      const [promotion] = await db.insert(promotions).values(insertPromotion).returning();
      return promotion;
    } catch (error) {
      console.error('Error creating promotion:', error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();