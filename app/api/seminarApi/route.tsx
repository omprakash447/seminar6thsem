import SeminarModel from "@/app/schema/SeminarModel";
import { Database } from "@/lib/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // ✅ Fix: Force dynamic API route

export async function POST(req: Request) {
    try {
        await Database();
        const { topic, category, student1, student2 } = await req.json();

        if (!topic || !category || !student1) {
            return NextResponse.json(
                { message: "Please fill all required fields." },
                { status: 400 }
            );
        }

        const seminarPost = new SeminarModel({ topic, category, student1, student2 });
        await seminarPost.save();

        return NextResponse.json(
            { message: "Seminar submitted successfully!" },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            { message: "Server error", error: err },
            { status: 500 }
        );
    }
}

// ✅ GET: Fetch all seminar entries
export async function GET() {
    try {
        await Database();
        const seminars = await SeminarModel.find().sort({ createdAt: -1 });

        return NextResponse.json({ data: seminars }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch seminars", error },
            { status: 500 }
        );
    }
}
