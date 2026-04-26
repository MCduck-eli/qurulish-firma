import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const protectAdmin = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.cookies.admin_token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Ruxsat yo'q, iltimos tizimga kiring",
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        (req as any).admin = decoded;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ success: false, message: "Token yaroqsiz" });
    }
};
