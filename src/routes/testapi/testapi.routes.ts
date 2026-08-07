import { Router } from "express";
import TestApiController from "../../controller/testapi/testapi.controller";

const router = Router();
console.log("Test API route loaded");
router.get("/testapi", TestApiController.get);

export default router;