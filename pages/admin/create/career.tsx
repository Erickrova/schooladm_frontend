import React, { useState } from "react"
import AdminLayout from "../../../components/layouts/AdminLayout"
import useCareer from "../../../hooks/useCareer"

const CreateCareer = () => {
  const [name, setName] = useState<String>("")
  const [description, setDescription] = useState<String>("")
  const { createCareer } = useCareer()
  const handleCreateCareer = async (e: any): Promise<void> => {
    e.preventDefault()
    if (description.length < 1 || name.length < 1) {
      console.error("something is wrong")
      return
    }
    const careerObject: Object = {
      name: name.toLowerCase(),
      description,
    }
    const data: any = await createCareer(careerObject)
    if (data?.state) {
      setName("")
      setDescription("")
    }
    alert(data?.msg)
  }
  return (
    <AdminLayout>
      <div className="min-h-screen w-full bg-sky-600">
        <section className="w-full pt-[50px] pb-10">
          <form
            onSubmit={handleCreateCareer}
            className=" mx-4 md:mx-auto md:w-1/2"
          >
            <legend className="text-center text-4xl text-white font-black mb-10">
              Create a career
            </legend>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">Name</label>
              <input
                type="text"
                value={String(name)}
                onChange={(e) => setName(String(e.target.value))}
                className="p-2 rounded-full"
                placeholder="Career name"
              />
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">
                Description
              </label>
              <textarea
                value={String(description)}
                onChange={(e) => setDescription(String(e.target.value))}
                className="w-full h-32 rounded-md"
              ></textarea>
            </div>
            <input
              type="submit"
              value="Create Task"
              className="text-xl font-bold text-white px-4 py-2 text-center bg-red-400 hover:bg-red-500 transition-colors cursor-pointer w-full rounded-full mt-4"
            />
          </form>
        </section>
      </div>
    </AdminLayout>
  )
}

export default CreateCareer
