import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}){
    const job_id=params.id;
    try{
        const res=await prismaClient.application.findMany({
            where:{
                job_Id:job_id
            },
            include:{
                user:true
            }
        })
        return NextResponse.json({
            success:true
        })
    }catch(err:any){
        console.log(err.message);
        return NextResponse.json({
            success:false,
            message:"failed"
        })
    }
}