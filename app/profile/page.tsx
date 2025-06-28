"use client"
import { Copy, CopyCheck } from 'lucide-react'
import React, { useState } from 'react'

const Page = () => {
const [copied , setCopied] = useState(false)
const textCopy = "Crocodiles are the best animals ever in the world"

const handleCopy = () => {
navigator.clipboard.writeText(textCopy)
setCopied(true)
setTimeout(() => {
  setCopied(false)
}, 2000);
}

  return (
    <div className="p-4">
      <h1>Blogs</h1>
      <div className="relative border my-4 px-2 py-4">
{textCopy}
<span onClick={handleCopy} className="absolute right-3 bottom-3 cursor-pointer border p-1 rounded-md">{copied ? <CopyCheck/> : <Copy/> }</span>

      </div>
      <input type="text"
     className="w-full bg-gray-100 px-2 py-2 "
     />
    </div>
  )
}

export default Page









