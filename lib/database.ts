import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

export async function Database() {
    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined in .env.local");
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Database connected successfully");
    } catch (err) {
        console.error("❌ Database connection error:", err);
    }
}
