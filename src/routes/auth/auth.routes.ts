import { Router } from "express";
import UserController from "../../controller/auth/auth.controller";

const router = Router();

router.get("/users", UserController.get);

export default router;
