"use client"
import { SignedIn, SignedOut, SignOutButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import  {Menu, X} from 'lucide-react'
import Sidebar from './Sidebar'
import { usePathname } from 'next/navigation'

const Navbar = () => {

const [nav , setNav] = useState(false)

const handleNav = () => {
  setNav(!nav)
}

const navlinks = [
  {id : 1 , title : "Home" , link : "/"},
  {id : 2 , title : "Dashboard" , link : "/dashboard"},
  {id : 3 , title : "Products" , link : "/products"},
  {id : 4 , title : "Profile" , link : "/profile"}
]

const pathname = usePathname()

  return (
    <div className="flex items-center justify-between px-6 md:px-12 h-15 w-full bg-slate-900 text-white shadow-md">
      <div>
        <Link href="/" > 
        <h1 className="font-bold first-letter:text-2xl">Tando <span className="">X</span> <span className=""> oM</span></h1>
        </Link>
      </div>
      
      <div className="hidden md:flex gap-4">
{navlinks.map((link) => (
  <Link
  href={link.link}
  key={link.id}
className={`text-slate-100 ${pathname === link.link && " font-semibold"}`}
>
  {link.title}
</Link>
))}
      </div>
      <div className="flex items-center gap-3">
        <SignedIn>
 <div className="flex items-center gap-3">
 <Button variant="outline" asChild>
            <SignOutButton></SignOutButton>
          </Button>
<UserButton></UserButton>
 </div>
        </SignedIn>
        <SignedOut>
          <Button asChild variant="outline" >
            <Link href="signup">Sign Up</Link>
          </Button>
        </SignedOut>
<div className="block md:hidden cursor-pointer transition-all duration-200" onClick={handleNav}>
{!nav ? <Menu/> : <X/>}
</div>
      </div>
      <div className="fixed top-0 left-0">
        <Sidebar isOpen={nav} handleNav={handleNav}/>
      </div>
    </div>
  )
}

export default Navbar
