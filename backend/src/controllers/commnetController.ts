import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";
import type { Request, Response } from "express";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { productId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content is required" });
    }

    const productIdStr = Array.isArray(productId) ? productId[0] : productId;
    const product = await queries.getProductById(productIdStr);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const comment = await queries.createComment({
      userId,
      productId: productIdStr,
      content,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { commentId } = req.params;
    const commentIdStr = Array.isArray(commentId) ? commentId[0] : commentId;

    const existingComment = await queries.getCommentById(commentIdStr);
    if (!existingComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (existingComment.userId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await queries.deleteComment(commentIdStr);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

export default {
  createComment,
  deleteComment,
};