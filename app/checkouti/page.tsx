"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const Page = () => {

  const [message , setMessage] = useState("")
const [answer , setAnswer] = useState("")

 async function GetAnswer (){
  const response = await fetch("/api/openai", {
    method : "POST" ,
    headers : {
      "Content-type" : "application/json"
    },
    body : JSON.stringify({
      prompt : message
    })
  })
  const data = await response.json()
  setAnswer(data.result)
 }

 const handleAi = async () => {
if(!message.trim()) return ;
await GetAnswer();
setMessage("")
 }
 
  return (
    <div className="flex justify-center p-4">
   <div className="border p-2 w-80">
   <input type="text"
   value={message}
   onChange={(e) => setMessage(e.target.value)}
   onKeyDown={(e) => {
    if(e.key === "Enter"){
      handleAi();
    }
   }}
      className="bg-gray-100 mr-3 rounded-md px-3 py-1"
      placeholder='Message'
      />
      <Button onClick={handleAi} variant="outline">Send</Button>
      <p className="my-3 ">Respond : {answer}</p>
   </div>
    </div>
  )
}

export default Page


