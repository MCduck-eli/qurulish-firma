import { Router } from "express";
import multer from "multer";
import fs from "fs";
import { createBlog, getBlogById } from "../controllers/blog-controller";
import { protectAdmin } from "../middleware/auth-middleware";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = "uploads/";
        if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

router.post("/", protectAdmin, upload.array("images", 10), createBlog);
router.get("/:id", getBlogById);

export default router;
