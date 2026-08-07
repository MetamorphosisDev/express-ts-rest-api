import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../../config/db";
import { usersTable } from "../../config/schema";

export class UserController {
  getAll = async (req: Request, res: Response) => {
    try {
      const data = await db.select().from(usersTable);
      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Error di UserController.getAll:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "ID tidak valid" });
      }

      const data = await db.select().from(usersTable).where(eq(usersTable.id, id));
      if (data.length === 0) {
        return res.status(404).json({ success: false, message: "User tidak ditemukan" });
      }

      return res.status(200).json({ success: true, data: data[0] });
    } catch (error) {
      console.error("Error di UserController.getById:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      if (!name || typeof name !== "string") {
        return res.status(400).json({ success: false, message: "Field name wajib diisi" });
      }

      const data = await db.insert(usersTable).values({ name }).returning();
      return res.status(201).json({ success: true, data: data[0] });
    } catch (error) {
      console.error("Error di UserController.create:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "ID tidak valid" });
      }

      const { name } = req.body;
      if (!name || typeof name !== "string") {
        return res.status(400).json({ success: false, message: "Field name wajib diisi" });
      }

      const data = await db
        .update(usersTable)
        .set({ name })
        .where(eq(usersTable.id, id))
        .returning();
      if (data.length === 0) {
        return res.status(404).json({ success: false, message: "User tidak ditemukan" });
      }

      return res.status(200).json({ success: true, data: data[0] });
    } catch (error) {
      console.error("Error di UserController.update:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  remove = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "ID tidak valid" });
      }

      const data = await db.delete(usersTable).where(eq(usersTable.id, id)).returning();
      if (data.length === 0) {
        return res.status(404).json({ success: false, message: "User tidak ditemukan" });
      }

      return res.status(200).json({ success: true, message: "User berhasil dihapus" });
    } catch (error) {
      console.error("Error di UserController.remove:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
}

export default new UserController();
