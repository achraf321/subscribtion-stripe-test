import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST (req : NextRequest){
    const {title , content} = await req.json()

    if(!title || !content){
        return NextResponse.json({error : "Data required"} , {status : 400})
    }

    await prisma.user.create({
        data : {
            posts : {
                create : {
                    title : title,
                    content : content
                }
            }
        }
    })
}