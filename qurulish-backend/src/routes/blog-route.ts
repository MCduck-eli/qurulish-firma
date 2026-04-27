import { Router } from "express";
import multer from "multer";
import fs from "fs";
import {
    createBlog,
    deleteBlog,
    getBlogById,
    getBlogs,
    updateBlog,
} from "../controllers/blog-controller";

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

router.post("/", upload.array("images", 10), createBlog);
router.get("/:id", getBlogById);
router.delete("/:id", deleteBlog);
router.put("/:id", upload.array("images", 10), updateBlog);
router.get("/", getBlogs);

export default router;
