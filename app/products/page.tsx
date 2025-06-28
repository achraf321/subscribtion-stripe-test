"use client"
import React from 'react'
import { AvailablePlans} from "@/lib/plans"
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

interface SubscribeProp {
  url : string
}


async function SubscribeToPlan (userId : string, email : string ,planType : string) : Promise<SubscribeProp> {
  const response = await fetch("/api/checkout", {
    method : "POST" ,
    headers : {
      "Content-type" : "application/json"
    },
    body : JSON.stringify({
      userId ,
      planType,
      email,
    })
  })
if(!response) {
  console.log("No Response")
}

const data = await response.json()
return data
}



const Product = () => {

const {user} = useUser()
const router = useRouter()

const userId = user?.id || ""
const email = user?.emailAddresses[0].emailAddress || ""

const {mutate} = useMutation<SubscribeProp , Error , {planType : string}>({
  mutationFn : async ({planType}) =>{
    if(!userId){
      console.log("You Must Sign In")
    }
return SubscribeToPlan(userId ,email , planType)
  },
  onSuccess : (data) => {
    window.location.href = data.url
  }
})


function HandleSubscribe (planType : string) {
if(!userId) {
  router.push("/signup")
  return
}
mutate({planType})
}



  return (
    <div className="">
      <h1 className="font-bold text-3xl text-center my-4 underline">All Plans</h1>
      
<div className="grid grid-cols-1 lg:grid-cols-3 px-4 pt-6 space-x-3 space-y-3">
{AvailablePlans.map((item , index) => (
<Card key={index}>
  <CardHeader>
    <CardTitle>
      <h1>{item.title}</h1>
    </CardTitle>
    <CardDescription>
      <p>{item.description}</p>
      price : 
    </CardDescription>
    <p className="font-semibold">Price : <span className="text-2xl font-bold">{item.price} $</span></p>
  </CardHeader>

 <Button variant="outline" className="mx-6" onClick={() => HandleSubscribe(item.title)}>
    Buy Now
  </Button>

</Card>
      ))}
</div>

    </div>
  )
}

export default Product
