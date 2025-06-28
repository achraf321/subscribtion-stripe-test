import { NextRequest, NextResponse } from "next/server";
import {OpenAI} from "openai"

const openai = new OpenAI({
    apiKey : process.env.OPENAI_SECRET_KEY,
})

export async function POST (req : NextRequest) {
try {
    const {prompt} = await req.json()

const response = await openai.chat.completions.create({
    model : "gpt-4o-mini",
    messages : [{role : "user" , content: `${prompt} 
        response this message with an efficient simple answer not very long not very short and stay only in science stuff dont go far `}]
})

return NextResponse.json({result : response.choices[0].message.content})
} catch (error) {
    return NextResponse.json({error : error} , {status : 500})
}
}