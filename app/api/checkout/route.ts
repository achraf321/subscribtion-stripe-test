import { GetPriceId } from "@/lib/plans";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";


export async function POST (req : NextRequest) {
try {
    const {userId , planType , email}  = await req.json()

    if(!userId || !planType || !email) {
        return NextResponse.json({error : "Require Date"} , {status : 400})
    }

    const allowedPlans = ["Basic" , "Starter" , "Companies"]

    if(!allowedPlans.includes(planType)){
        return NextResponse.json({error : "Error Plan Type"} , {status : 400})
    }

const priceId = GetPriceId(planType)

    const session = await stripe.checkout.sessions.create({
        payment_method_types : ["card"],
        line_items : [
            {
                price : priceId ,
                quantity : 1,
            }
        ],
        mode : "payment" ,
        metadata : {clerkId : userId},
        success_url : `${process.env.NEXT_BASE_URL}/success`,
        cancel_url : `${process.env.NEXT_BASE_URL}/cancel`,        
    })

    return NextResponse.json({url : session.url})
} catch (error) {
    return NextResponse.json({error : error} , {status : 500})
}
}