import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'


const isPublicRoute = createRouteMatcher([
    "/",
    "/signup(.*)",
"/api/create(.*)",
"/creating(.*)",
"/api/task(.*)"
])

export default clerkMiddleware(async (auth , req) => {
    const user = await auth()

const {userId} = await user

const {origin , pathname} = req.nextUrl

console.log(pathname , userId , origin)

if(!isPublicRoute(req) && !userId){
    return NextResponse.redirect(new URL("/signup" , req.url))
}

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}