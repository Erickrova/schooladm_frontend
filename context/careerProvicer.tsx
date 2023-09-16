import { createContext, useEffect, useState } from "react"
import { Careers, ChildrenProps } from "../helpers/interfaces"
import useAuth from "../hooks/useAuth"

const CareerContext = createContext<null | any>(null)

const CareerProvider = ({ children }: ChildrenProps) => {
  const [careers, setCareers] = useState<Array<Careers>>()
  const { auth } = useAuth()

  //** GET functions
  const getCareers = async (): Promise<Array<Careers>> => {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("something wrong")
    }
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const data: Array<Careers> = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/career/get-careers`,
        init,
      )
        .then((res) => res.json())
        .then((data) => data)
      return data
    } catch (error) {
      throw new Error("something wrong")
    }
  }
  //** POST functions
  const createCareer = async (careerObject: Object): Promise<Object> => {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("something wrong")
    }
    try {
      const init: Object = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify(careerObject),
      }
      const data: any = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/career/create`,
        init,
      )
        .then((res) => res.json())
        .then((data: any) => data)
      return data
    } catch (error) {
      throw new Error("something wrong")
    }
  }
  useEffect(() => {
    const call = async () => {
      const data: Array<Careers> = await getCareers()
      setCareers(data)
    }
    if (auth._id) {
      call()
    }
  }, [auth])
  return (
    <CareerContext.Provider
      value={{
        careers,
        setCareers,
        createCareer,
      }}
    >
      {children}
    </CareerContext.Provider>
  )
}

export { CareerContext }

export default CareerProvider
