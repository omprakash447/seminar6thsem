import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function Database(){
    try{
        await mongoose.connect("mongodb+srv://alekhakumarswain111:ynlyOZ17oaFCsoED@seminar.afgxi.mongodb.net/?retryWrites=true&w=majority&appName=seminar")
            return NextResponse.json({
                status:200,
                message:"database connected successfully",
            })
    }catch(err){
        return NextResponse.json({
            status:404,
            message:err,
        })
    }
}