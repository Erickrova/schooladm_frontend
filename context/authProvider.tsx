import { createContext, useEffect, useState } from "react"
import { Auth, ChildrenProps } from "../helpers/interfaces"

const AuthContext = createContext<any | null>(null)

const AuthProvider = ({ children }: ChildrenProps) => {
  const [auth, setAuth] = useState<Auth>({
    _id: "",
    name: "",
    rank: 0,
  })
  const [profile, setProfile] = useState<Object>({})
  const [loading, setLoading] = useState<Boolean>(true)
  const closeSession = () => {
    setAuth({
      _id: "",
      name: "",
      rank: 0,
    })
    localStorage.removeItem("token")
  }
  const startSession = async (sessionData: Object): Promise<Object> => {
    try {
      const init: Object = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(sessionData),
      }
      const data: any = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/login`,
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
    const authenticating = async () => {
      // checking if it's authenticated with a token
      const token = localStorage.getItem("token")
      if (!token) {
        setLoading(false)
        return
      }
      const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      if (token) {
        try {
          const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/profile`
          await fetch(url, init)
            .then((res) => res.json())
            .then((dat) => setAuth(dat))
        } catch (error) {
          console.log(error)
          setAuth({
            _id: "",
            name: "",
            rank: 0,
          })
        } finally {
          setLoading(false)
        }
      }
    }
    authenticating()
  }, [])
  useEffect(() => {
    try {
      // getting user profile
      if (auth._id) {
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/get-user/${auth?._id}`,
        )
          .then((res) => res.json())
          .then((res) => setProfile(res))
      }
    } catch (error) {
      console.error(error)
    }
  }, [auth])

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        profile,
        closeSession,
        startSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export { AuthContext }

export default AuthProvider
