import React, { useEffect, useState } from "react"
import AdminLayout from "../../../components/layouts/AdminLayout"
import { User } from "../../../helpers/interfaces"
import useUser from "../../../hooks/useUser"
import useSubject from "../../../hooks/useSubject"

const CreateSubject = () => {
  const [teacher, setTeacher] = useState<String>("")
  const [name, setName] = useState<String>("")
  const [description, setDescription] = useState<String>("")

  const { teachers } = useUser()
  const { createSubject } = useSubject()

  const handleCreateSubject = async (e: any): Promise<void> => {
    e.preventDefault()

    if (!teacher || !name) console.error("something is wrong")

    const subjectObject: Object = { teacher, name, description }
    const data: any = await createSubject(subjectObject)
    if (data?.state) {
      setTeacher("")
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
            onSubmit={handleCreateSubject}
            className=" mx-4 md:mx-auto md:w-1/2"
          >
            <legend className="text-center text-4xl text-white font-black mb-10">
              Create a subject
            </legend>
            <select
              value={String(teacher)}
              onChange={(e) => setTeacher(String(e.target.value))}
              className="p-2 rounded-full w-full mb-2"
            >
              <option value={0}>Select a teacher </option>
              {teachers?.length
                ? teachers.map((tch: User) => (
                    <option key={String(tch?._id)} value={String(tch?._id)}>
                      {tch?.personalData?.firstName}{" "}
                      {tch?.personalData?.lastName}
                    </option>
                  ))
                : null}
            </select>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">Name</label>
              <input
                type="text"
                value={String(name)}
                onChange={(e) => setName(String(e.target.value))}
                className="p-2 rounded-full"
                placeholder="Student name"
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

export default CreateSubject
