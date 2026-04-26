import { Request, Response } from "express";
import QRCode from "qrcode";
import blog from "../models/blog";

export const createBlog = async (req: Request, res: Response) => {
    try {
        const { title, description, imageDescriptions } = req.body;
        const files = req.files as Express.Multer.File[];
        const imageUrls = files.map((file) => `/uploads/${file.filename}`);
        const newBlog = new blog({
            title,
            description,
            images: imageUrls,
            imageDescriptions: imageDescriptions
                ? JSON.parse(imageDescriptions)
                : [],
        });

        const savedBlog = await newBlog.save();
        const clientUrl = `http://192.168.1.40:3000/obyekt/${savedBlog._id}`;
        const qrCodeImage = await QRCode.toDataURL(clientUrl, { width: 400 });
        res.status(201).json({
            success: true,
            data: {
                id: savedBlog._id,
                ...savedBlog.toJSON(),
                qrCode: qrCodeImage,
            },
        });
    } catch (error) {
        console.error("Saqlashda xatolik:", error);
        res.status(500).json({ error: "Saqlashda xatolik!" });
    }
};

export const getBlogById = async (req: Request, res: Response) => {
    console.log("1. So'rov keldi, ID:", req.params.id);
    try {
        if (req.params.id.length !== 24) {
            return res
                .status(400)
                .json({ success: false, message: "ID formati noto'g'ri" });
        }

        const foundBlog = await blog.findById(req.params.id).exec();

        if (!foundBlog) {
            return res
                .status(404)
                .json({ success: false, message: "Topilmadi" });
        }

        return res.json({ success: true, data: foundBlog });
    } catch (error: any) {
        console.error("❌ Xatolik yuz berdi:", error.message);
        return res
            .status(500)
            .json({ success: false, message: "Serverda xatolik" });
    }
};
