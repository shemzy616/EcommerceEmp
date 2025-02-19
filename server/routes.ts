import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertProductSchema } from "@shared/schema";
import { z } from "zod";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Products API
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getAllProducts();
      if (!products) {
        return res.status(404).json({ message: "No products found" });
      }
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Promotions API
  app.get("/api/promotions", async (_req, res) => {
    try {
      // Temporary mock data until database integration
      const promotions = [
        {
          id: 1,
          productId: 1,
          description: "Summer Sale",
          discountPercentage: 20,
          startDate: new Date(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        }
      ];
      res.json(promotions);
    } catch (error) {
      console.error("Error fetching promotions:", error);
      res.status(500).json({ message: "Failed to fetch promotions" });
    }
  });

  app.post("/api/products", async (req, res) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.sendStatus(403);
    }

    const result = insertProductSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const product = await storage.createProduct(result.data);
    res.status(201).json(product);
  });

  app.put("/api/products/:id", async (req, res) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.sendStatus(403);
    }

    const result = insertProductSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const id = parseInt(req.params.id);
    const product = await storage.updateProduct(id, result.data);
    if (!product) {
      return res.sendStatus(404);
    }
    res.json(product);
  });

  app.delete("/api/products/:id", async (req, res) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.sendStatus(403);
    }

  // Promotions API
  app.get("/api/promotions", async (_req, res) => {
    const promotions = await storage.getActivePromotions();
    res.json(promotions);
  });

  app.post("/api/promotions", async (req, res) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.sendStatus(403);
    }
    const promotion = await storage.createPromotion(req.body);
    res.status(201).json(promotion);
  });

    const id = parseInt(req.params.id);
    await storage.deleteProduct(id);
    res.sendStatus(204);
  });

  const httpServer = createServer(app);
  return httpServer;
}
