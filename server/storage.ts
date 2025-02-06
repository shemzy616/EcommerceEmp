import { IStorage } from "./storage";
import { InsertProduct, InsertUser, Product, User } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  sessionStore: session.Store;
  private currentUserId: number;
  private currentProductId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, isAdmin: false };
    this.users.set(id, user);
    return user;
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, insertProduct: InsertProduct): Promise<Product | undefined> {
    const existing = this.products.get(id);
    if (!existing) return undefined;
    
    const updated: Product = { ...insertProduct, id };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: number): Promise<void> {
    this.products.delete(id);
  }
}

export const storage = new MemStorage();
