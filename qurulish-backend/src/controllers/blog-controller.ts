import { Request, Response } from "express";
import QRCode from "qrcode";
import blog from "../models/blog";

export const createBlog = async (req: Request, res: Response) => {
    try {
        const { title, description, imageDescriptions } = req.body;
        const files = (req.files as Express.Multer.File[]) || [];
        const imageUrls = files.map((file) => `/uploads/${file.filename}`);

        let parsedDescriptions: string[] = [];
        if (imageDescriptions) {
            try {
                parsedDescriptions =
                    typeof imageDescriptions === "string"
                        ? JSON.parse(imageDescriptions)
                        : imageDescriptions;
            } catch (parseError) {
                console.error("Descriptions parse qilishda xato:", parseError);
                parsedDescriptions = [];
            }
        }

        const newBlog = new blog({
            title,
            description: description || "",
            images: imageUrls,
            imageDescriptions: parsedDescriptions,
        });
        const savedBlog = await newBlog.save();
        const blogId = savedBlog._id.toString();
        const clientUrl = `https://qurulish-firma.vercel.app/obyekt/${blogId}`;

        const qrCodeImage = await QRCode.toDataURL(clientUrl, {
            width: 400,
            margin: 2,
            color: {
                dark: "#000000",
                light: "#ffffff",
            },
        });

        res.status(201).json({
            success: true,
            data: {
                id: blogId,
                title: savedBlog.title,
                images: savedBlog.images,
                imageDescriptions: savedBlog.imageDescriptions,
                qrCode: qrCodeImage,
            },
        });
    } catch (error: any) {
        console.error("Saqlashda xatolik:", error);
        res.status(500).json({
            success: false,
            error: "Ma'lumotni saqlashda xatolik yuz berdi!",
            details: error.message,
        });
    }
};

export const getBlogById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (!id || id.length !== 24) {
            return res.status(400).json({
                success: false,
                message: "ID formati noto'g'ri (24 ta belgi bo'lishi kerak)",
            });
        }
        const foundBlog = await blog.findById(id).exec();

        if (!foundBlog) {
            return res.status(404).json({
                success: false,
                message: "Obyekt topilmadi",
            });
        }
        return res.json({
            success: true,
            data: foundBlog,
        });
    } catch (error: any) {
        console.error("ID bo'yicha olishda xato:", error.message);
        return res.status(500).json({
            success: false,
            message: "Serverda ichki xatolik yuz berdi",
        });
    }
};

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await blog.findByIdAndDelete(id);
        res.json({ success: true, message: "Obyekt o'chirildi" });
    } catch (error) {
        res.status(500).json({ success: false, error: "O'chirishda xatolik" });
    }
};

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, imageDescriptions } = req.body;
        const updatedData: any = {
            title,
            description,
        };
        if (imageDescriptions) {
            updatedData.imageDescriptions =
                typeof imageDescriptions === "string"
                    ? JSON.parse(imageDescriptions)
                    : imageDescriptions;
        }
        const files = (req.files as Express.Multer.File[]) || [];
        if (files.length > 0) {
            const newImageUrls = files.map(
                (file) => `/uploads/${file.filename}`,
            );
            updatedData.images = newImageUrls;
        }
        const updatedBlog = await blog.findByIdAndUpdate(id, updatedData, {
            new: true,
        });
        if (!updatedBlog) {
            return res
                .status(404)
                .json({ success: false, message: "Obyekt topilmadi" });
        }
        res.json({ success: true, data: updatedBlog });
    } catch (error: any) {
        console.error("Yangilashda xato:", error.message);
        res.status(500).json({ success: false, error: "Yangilashda xatolik" });
    }
};

export const getBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await blog.find().sort({ createdAt: -1 });

        return res.json({
            success: true,
            data: blogs,
        });
    } catch (error: any) {
        console.error("Bloglarni olishda xato:", error.message);
        return res.status(500).json({
            success: false,
            message: "Serverda xatolik",
        });
    }
};
