import { pgTable, text, serial, integer, decimal, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  imageUrl: text("image_url").notNull(),
  stock: integer("stock").notNull().default(0),
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users, {
  id: z.number().optional(),
  isAdmin: z.boolean().optional(),
}).pick({
  username: true,
  password: true,
});

export const insertProductSchema = createInsertSchema(products, {
  id: z.number().optional(),
}).pick({
  name: true,
  description: true,
  price: true,
  imageUrl: true,
  stock: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;