import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST () {

    try {
    const clerkUser = await currentUser()

    if (!clerkUser) {
        return NextResponse.json({message : "Cant find user"} , {status : 404})
    }

    const email = clerkUser?.emailAddresses[0].emailAddress
    
      if(!email) {
            return NextResponse.json("require information" , {status : 404})
        }

    await prisma.user.create({
        data : {
            userId : clerkUser.id,
            email : email,
        }
    })

    return NextResponse.json({message : "User Created Succesfully"} , {status : 201})
} catch (error) {
    return NextResponse.json({error : "Cant Create User"} , {status : 500})
}
}