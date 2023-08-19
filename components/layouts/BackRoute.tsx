import { useRouter } from "next/router"
import React, { useEffect } from "react"

const BackRoute = (): JSX.Element => {
  // protecting route
  const router = useRouter()
  useEffect(() => {
    router.push("/")
  }, [router])
  return <div>...</div>
}

export default BackRoute
