// components/Sidebar.tsx
import React from 'react';
import { Home, Package, Settings, User } from 'lucide-react';
import Link from 'next/link';


type SideProp = {
  isOpen : boolean ,
  handleNav : () => void
}

const navlinks = [
  {id : 1 , title : "Home" , link : "/"},
  {id : 2 , title : "Dashboard" , link : "/dashboard"},
  {id : 3 , title : "Products" , link : "/products"},
  {id : 4 , title : "Profile" , link : "/profile"}
]

const Sidebar = ({isOpen , handleNav} : SideProp) => {
  return (
    <div className={`fixed top-0 left-0 z-10 h-screen w-[60%] bg-white shadow-md p-4 ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-all duration-200`}>
     <h1 className="font-semibold mb-6 text-black">Pages</h1>
      <ul className="space-y-4 text-black">
  {navlinks.map((link) => (
    <ul className="hover:font-semibold hover:underline" key={link.id} onClick={handleNav}><Link href={link.link}>{link.title}</Link></ul>
  ))}
      </ul>
    </div>
  );
};

export default Sidebar;

