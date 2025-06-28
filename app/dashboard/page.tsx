"use client"
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import useCounterStore from '../store/counterStore'

const Page = () => {


const {count , increase , decrease} = useCounterStore()

  const products = [
    {id : 1, title : "AirForce1" , imgSrc : "/First.jpg" , price : 100},
    {id : 2, title : "AirForce2" , imgSrc : "/Second.jpg" , price : 100},
    {id : 3, title : "AirForce3" , imgSrc : "/Third.jpg" , price : 100},
    {id : 4, title : "AirForce4" , imgSrc : "/Fourth.jpg" , price : 100},
    {id : 5, title : "AirForce5" , imgSrc : "/fifth.jpg" , price : 100},
  ]
  return (
    <div className="p-4 space-y-4">
      {products.map((product) => (
        <div key={product.id} className="flex border p-1">
          <Image src={product.imgSrc} alt='' height={60} width={60}/> 
          <div className="pl-4">
<h1>{product.title}</h1>
<p>Price : {product.price}</p>
          </div>
          <div className="px-4">
            Quantity : {count}
           <div className="flex gap-3">
           <Button onClick={increase}><Plus/></Button>
           <Button onClick={decrease}><Minus/></Button>
           </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Page

