import { Router } from "express";
import authController from "../controllers/auth.controller";
import { protectAdmin } from "../middleware/auth-middleware";
const router = Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/verify-admin", protectAdmin, authController.verify);

export default router;
