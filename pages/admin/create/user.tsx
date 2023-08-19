import { useRouter } from "next/router"
import Layout from "../../../components/layouts/Layout"
import { useEffect, useState } from "react"
import AdminLayout from "../../../components/layouts/AdminLayout"
import { Careers } from "../../../helpers/interfaces"
import useCareer from "../../../hooks/useCareer"
import useUser from "../../../hooks/useUser"

const Register = () => {
  const [rank, setRank] = useState<Number>(0)
  const [firstName, setFirstName] = useState<String>("")
  const [lastName, setLastName] = useState<String>("")
  const [career, setCareer] = useState<String>("")
  const [semester, setSemester] = useState<Number>(0)
  const [documentType, setDocumentType] = useState<String>("")
  const [documentNumber, setDocumentNumber] = useState<Number>(0)
  const [email, setEmail] = useState<String>("")
  const [contactNumber, setContactNumber] = useState<Number>(0)
  const [streetAdress, setStreetAdress] = useState<String>("")
  const [password, setPassword] = useState<String>("")

  const { careers } = useCareer()
  const { registerUser } = useUser()

  const handleRegisterUser = async (e: any): Promise<void> => {
    e.preventDefault()
    if (
      Number(rank) < 1 ||
      !firstName ||
      !lastName ||
      !career ||
      !documentNumber ||
      !documentType ||
      !email ||
      !contactNumber ||
      !streetAdress ||
      !password
    ) {
      console.error("something is wrong")
      return
    }
    const personalData: Object = {
      firstName,
      lastName,
      career,
      semester,
      documentType,
      documentNumber,
      contactNumber,
      streetAdress,
    }
    const userObject: Object = { rank, personalData, email, password }
    const data: any = await registerUser(userObject)
    if (data?.state) {
      setRank(0)
      setFirstName("")
      setLastName("")
      setCareer("")
      setSemester(0)
      setDocumentType("")
      setDocumentNumber(0)
      setEmail("")
      setContactNumber(0)
      setStreetAdress("")
      setPassword("")
    }
    alert(data?.msg)
  }

  return (
    <AdminLayout>
      <div className="min-h-screen w-full bg-sky-600">
        <section className="w-full pt-[50px] pb-10">
          <form
            onSubmit={handleRegisterUser}
            className=" mx-4 md:mx-auto md:w-1/2"
          >
            <legend className="text-center text-4xl text-white font-black mb-10">
              Register a new user
            </legend>
            <select
              value={Number(rank)}
              onChange={(e) => setRank(Number(e.target.value))}
              className="p-2 rounded-full w-full mb-2"
            >
              <option value={0} disabled>
                Select a rank{" "}
              </option>
              <option value={1}>Student </option>
              <option value={2}>Teacher </option>
              <option value={3}>Admin </option>
            </select>
            <select
              value={String(career)}
              onChange={(e) => setCareer(String(e.target.value))}
              className="p-2 rounded-full w-full mb-2"
            >
              <option value={""} disabled>
                Select a career{" "}
              </option>
              {careers?.length
                ? careers.map((careerr: Careers) => (
                    <option
                      key={String(careerr?._id)}
                      value={String(careerr?._id)}
                    >
                      {careerr?.name}{" "}
                    </option>
                  ))
                : null}
            </select>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">First Name</label>
              <input
                type="text"
                value={String(firstName)}
                onChange={(e) => setFirstName(String(e.target.value))}
                className="p-2 rounded-full"
                placeholder="Student name"
              />
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">Last Names</label>
              <input
                type="text"
                value={String(lastName)}
                onChange={(e) => setLastName(String(e.target.value))}
                className="p-2 rounded-full"
                placeholder="Student last names"
              />
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">Semester</label>
              <input
                type="number"
                value={Number(semester)}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="p-2 rounded-full"
                placeholder="Student semester"
              />
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">
                Document type
              </label>
              <input
                type="text"
                value={String(documentType)}
                onChange={(e) => setDocumentType(String(e.target.value))}
                className="p-2 rounded-full"
                placeholder="Student document type"
              />
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">
                Document number
              </label>
              <input
                type="number"
                value={Number(documentNumber)}
                onChange={(e) => setDocumentNumber(Number(e.target.value))}
                className="p-2 rounded-full"
                placeholder="Student document number"
              />
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">E-Mail</label>
              <input
                type="email"
                value={String(email)}
                onChange={(e) => setEmail(String(e.target.value))}
                className="p-2 rounded-full"
                placeholder="Student email"
              />
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">
                Contact number
              </label>
              <input
                type="number"
                value={Number(contactNumber)}
                onChange={(e) => setContactNumber(Number(e.target.value))}
                className="p-2 rounded-full"
                placeholder="Student contact number"
              />
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">
                Street address
              </label>
              <input
                type="text"
                value={String(streetAdress)}
                onChange={(e) => setStreetAdress(String(e.target.value))}
                className="p-2 rounded-full"
                placeholder="Student street address"
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
              value="Register"
              className="text-xl font-bold text-white px-4 py-2 text-center bg-red-400 hover:bg-red-500 transition-colors cursor-pointer w-full rounded-full mt-4"
            />
          </form>
        </section>
      </div>
    </AdminLayout>
  )
}

export default Register
