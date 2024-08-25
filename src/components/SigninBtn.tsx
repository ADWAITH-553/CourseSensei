'use client'
import React from 'react'
import { Button } from './ui/button'
import { signIn } from 'next-auth/react'

type Props = {}

const SigninBtn = (props: Props) => {
  return (
    <Button variant='ghost' className='hover:text-violet-600' onClick={()=>{
        signIn("google");
    }}>
        Sign In
    </Button>
  )
}

export default SigninBtn