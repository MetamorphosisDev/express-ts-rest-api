import { Request, Response } from "express";
import { userData } from "../../data/user.data";

export class TestApiController {
  get = async (req: Request, res: Response) => {
    try {
      return res.status(200).json({
        success: true,
        data: userData
      });
    } catch (error) {
      console.error("Error di TestApiController.get:", error);

      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  }
}

export default new TestApiController();