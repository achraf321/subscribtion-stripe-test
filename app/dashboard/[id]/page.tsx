import React from 'react'

const Signle = async ({params} : {params : {id : string}}) => {

    const {id} = await params
  return (
    <div className="text-5xl font-blod flex justify-center items-center">
      {id}
    </div>
  )
}

export default Signle
