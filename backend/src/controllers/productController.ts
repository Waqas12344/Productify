import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await queries.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idStr = Array.isArray(id) ? id[0] : id;
    const product = await queries.getProductById(idStr);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(`Error fetching product:`, error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
}

export const getMyProducts = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const products = await queries.getProductsByUserId(userId);
    res.json(products);
  } catch (error) {
    console.error("Error fetching user's products:", error);
    res.status(500).json({ error: "Failed to fetch user's products" });
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { title, description, imageUrl } = req.body;

   if (!title || !description || !imageUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const product = await queries.createProduct({ title, description, imageUrl, userId });
    res.status(201).json(product);
  }
    catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
}


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { id } = req.params;
    const idStr = Array.isArray(id) ? id[0] : id;
    const { title, description, imageUrl } = req.body;

    const existingProduct = await queries.getProductById(idStr);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (existingProduct.userId !== userId) {
      return res.status(403).json({ error: "You are not the owner of this product" });
    }

    const product = await queries.updateProduct(idStr, { title, description, imageUrl });
    res.json(product);
  } catch (error) {
    console.error(`Error updating product:`, error);
    res.status(500).json({ error: "Failed to update product" });
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.params;
    const idStr = Array.isArray(id) ? id[0] : id;
    const existingProduct = await queries.getProductById(idStr);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (existingProduct.userId !== userId) {
      return res.status(403).json({ error: "You are not the owner of this product" });
    }

    await queries.deleteProduct(idStr);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(`Error deleting product:`, error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

export default {
  getAllProducts,
  getProductById,
  getMyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};