import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST (req : NextRequest){
    try {

        const {title , description} = await req.json()

    const user = await currentUser()
    if(!user){
        return NextResponse.json({error : "No User Found"}, {status : 404})
    }
    const email = user?.emailAddresses[0].emailAddress || "";
    if(!email){
        return NextResponse.json({error : "Email Required"}, {status : 400})
    }

    const profile = await prisma.user.findUnique({
        where : {email : email}
    })

await prisma.task.create({
    data : {
        title : title,
        description : description,
        user : {
            connect : {email : profile?.email}
        }
    }
})

return NextResponse.json({message : "Task Creted Succesfully"} , {status : 201})
    } catch (error) {
        return NextResponse.json({message : "Internal Error"} , {status : 500})
    }
}


export async function GET () {
    try {
        const user = await currentUser()
        if(!user){
            return NextResponse.json({error : "No User Found"}, {status : 404})
        }
        const email = user?.emailAddresses[0].emailAddress || "";
        if(!email){
            return NextResponse.json({error : "Email Required"}, {status : 400})
        }

        const tasks = await prisma.task.findMany({
            where : {
                user : {
                    email : email
                }
            },
        })

        return NextResponse.json(tasks , {status : 201})
    } catch (error) {
        return NextResponse.json({error : error } , {status : 500})
    }
}


export async function DELETE (req : NextRequest) {
   try {
    const {id} = await req.json()

    if(!id){
        return NextResponse.json({error : "Invalid Id"} , {status : 400})
    }

    await prisma.task.delete({
        where : {id : id}
    })

    return NextResponse.json({message : "Deleted Successfully"} , {status : 200})
   } catch (error) {
    return NextResponse.json({message : "Internal Error"} , {status : 500})
   }
}