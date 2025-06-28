"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'

interface Props {
  id : number ,
  title : string,
  description : string
}

const Page = () => {

const [title , setTitle] = useState("")
const [description , setDescription] = useState("")
const [message , setMessage] = useState("")

const [products , setProducts] = useState<Props[]>([])
const [isloading , setisLoading] = useState(false)

async function GetTasks (){
  setisLoading(true)

try {
  const response = await fetch("/api/task")
  const data = await response.json()
  setProducts(data)
} finally {
  setisLoading(false)
}
}

async function CreateTask () {
  const response = await fetch("/api/task" , {
    method : "POST",
    headers : {
      "Content-type" : "application/json"
    },
    body : JSON.stringify({
      title,
      description,
    })
  })
  if(!response.ok) throw new Error("Cant Fetch it")
    const data = await response.json()
  setTitle("")
  setDescription("")
  setMessage(data.message)
await GetTasks()
  return data
}

useEffect(() => {
GetTasks()
}, [])

const handleDelete = async (id : number) => {

  try {
    const response = await fetch("/api/task", {
      method : "DELETE" , 
      headers : {
        "Content-type" : "application/json"
      },
      body : JSON.stringify({id})
    })

    if(!response.ok) throw new Error("Cant get the data")
      
      const data = await response.json()

    setProducts((prevProduct) => (
      prevProduct.filter((product) => product.id !== id)
    ))

  } catch (error) {
    console.error(error)
  }
}
  return (
    <div className="mx-36 bg-gray-400 h-screen p-6 shadow-md">
    <div className="p-4 px-36 border border-slate-900">
    <h1 className="text-center font-bold text-4xl">Create Task</h1>
    <div className="space-y-4 pt-10">
 <div className="flex items-center justify-between gap-6">
 <label  htmlFor="title">Title</label>
      <input type="text" id='title'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="bg-gray-100 rounded-md w-full px-2 py-1"
      placeholder='Title eg.Nature'
      />
 </div>
 <div className="flex items-center justify-between gap-6">
 <label  htmlFor="description">Description</label>
      <input type="text" id='description'
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="bg-gray-100 rounded-md w-full px-2 py-1"
      placeholder='Descrip ...'
      />
 </div>
    </div>
    <div className="flex justify-center my-6">
    <Button onClick={CreateTask}>Send</Button>
    </div>
    {message && <p className="text-center">{message}</p>}
    </div>
    <h1 className="font-bold text-3xl text-center my-10">All The Task'S</h1>
{!isloading ? 
   <div className="space-y-4">
    {Array.isArray(products) ? products.map((task) => (
          <div key={task.id} className="flex justify-between ">
            <p>{task.title}</p>
            <p>Description : {task.description}</p>
            <span onClick={() => handleDelete(task.id)} className="bg-red-500 rounded-md cursor-pointer px-2 text-white ">Delete</span>
          </div>
        )) : <p>No Products Yet ... stay tuned Y'all</p>
    }
   </div>
 : (<p>Loadding ...</p>)}
</div>
  )
}

export default Page
  



