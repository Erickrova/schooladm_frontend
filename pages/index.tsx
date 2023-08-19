import { useEffect, useState } from "react"
import Layout from "../components/layouts/Layout"
import useAuth from "../hooks/useAuth"
import { useRouter } from "next/router"

export default function Home() {
  const [email, setEmail] = useState<String>("")
  const [password, setPassword] = useState<String>("")

  const router = useRouter()
  const { auth, setAuth, loading, startSession } = useAuth()

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault()

    const data: any = await startSession({ email, password })
    if (data.state) {
      setAuth(data.session)
      localStorage.setItem("token", data.session.token)
      setEmail("")
      setPassword("")
    }
  }

  useEffect(() => {
    if (auth._id && !loading) {
      router.push("/profile")
    }
  }, [auth, loading, router])

  return (
    <>
      <Layout>
        <div className="min-h-screen w-full bg-sky-600">
          <section className="w-full pt-[200px]">
            <form
              onSubmit={handleSubmit}
              className=" mx-4 md:mx-auto md:w-1/2 "
            >
              <legend className="text-center text-4xl text-white font-black mb-10">
                Welcome to SchoolAdm
              </legend>
              <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">E-Mail</label>
                <input
                  type="email"
                  value={String(email)}
                  onChange={(e) => setEmail(String(e.target.value))}
                  className="p-2 rounded-full"
                  placeholder="your email here"
                />
              </div>
              <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">Password</label>
                <input
                  type="password"
                  value={String(password)}
                  onChange={(e) => setPassword(String(e.target.value))}
                  className="p-2 rounded-full"
                  placeholder="your password here"
                />
              </div>
              <input
                type="submit"
                value="Login"
                className="text-xl font-bold text-white px-4 py-2 text-center bg-red-400 hover:bg-red-500 transition-colors cursor-pointer w-full rounded-full mt-4"
              />
            </form>
          </section>
        </div>
      </Layout>
    </>
  )
}
