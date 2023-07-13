import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const BackRoute = () => {
  // protecting route
    const router = useRouter()
    useEffect(()=>{
        router.push("/")
    },[])
  return (
    <div>...</div>
  )
}

export default BackRoute