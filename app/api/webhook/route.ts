import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";



export async function POST (req : NextRequest) {
    const body = await req.text()
    const signature = req.headers.get("stripe-signature");

    const webhookSecret = process.env.STRIPE_SECRET!


    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body ,
            signature || "",
            webhookSecret,
        )
    } catch (error) {
        return NextResponse.json({error : error})
    }

    switch (event.type) {
        case "checkout.session.completed" : 
        const session = event.data.object as Stripe.Checkout.Session
await handleCheckoutSession(session)
        break ;
    }
    
}

function handleCheckoutSession (session : Stripe.Checkout.Session) {
const userId = session.metadata?.clerkId;
if(!userId){
    console.log("No UserId")
    return
}

const subscriptionId = session.subscription as string
if(!subscriptionId){
    console.log("No SubId")
    return
}

try {
    await prisma.profile.update({
        where : {userId},
        data : {
            strip
        }
    })
} catch (error) {
    
}
}