import {SignUp} from "@clerk/nextjs"
import React from 'react'

const SignUpPage = () => {
  return (
    <div className="flex justify-center p-4 ">
<SignUp redirectUrl="/creating"/>
    </div>
  )
}

export default SignUpPage
