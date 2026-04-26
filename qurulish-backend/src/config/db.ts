import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB || "");
        console.log("✅ MongoDB muvaffaqiyatli ulandi");
    } catch (error) {
        console.error("❌ MongoDB ulanishda xato:", error);
        process.exit(1);
    }
};
