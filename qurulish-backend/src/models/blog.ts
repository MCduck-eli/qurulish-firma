import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
    title: string;
    description: string;
    images: string[];
    createdAt: Date;
}

const BlogSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    images: [String],
    imageDescriptions: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Blog ||
    mongoose.model<IBlog>("Blog", BlogSchema);
