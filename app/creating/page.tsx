"use client"
import React, { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'


async function CreateProfile () {
    const response = await fetch("/api/create-user" , {
        method : "POST" ,
        headers : {
            "Content-type" : "application/json"
        },
    })
    if(!response.ok) throw new Error("Cant send data")
const data = await response.json()
    return data
}


const Creating = () => {
const {isLoaded , isSignedIn} = useUser()
const router = useRouter()

const {mutate} = useMutation({
    mutationFn : CreateProfile,
    onSuccess : () => {
     router.push("/")
    },onError : (error) =>{
      console.log(error)
    } 
})
 useEffect(() => {
if(isLoaded && isSignedIn){
  mutate()
}
 }, [isLoaded , isSignedIn])

 return <div>Signing In ...</div>
}

export default Creating
