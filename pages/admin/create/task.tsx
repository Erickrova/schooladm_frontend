import React, { useEffect, useState } from "react"
import AdminLayout from "../../../components/layouts/AdminLayout"
import { useRouter } from "next/router"
import { Careers, Subject, User } from "../../../helpers/interfaces"
import semesterOptions from "../../../helpers/semesterOptions"
import useTasks from "../../../hooks/useTasks"
import useCareer from "../../../hooks/useCareer"
import useSubject from "../../../hooks/useSubject"
import useUser from "../../../hooks/useUser"

const CreateTask = () => {
  const [teacher, setTeacher] = useState<string>()
  const [guests, setGuests] = useState<String>("")
  const [subject, setSubject] = useState<String>("")
  const [semester, setSemester] = useState<Number>(0)
  const [title, setTitle] = useState<String>("")
  const [description, setDescription] = useState<String>("")
  const [initialDate, setInitialDate] = useState<String>("")
  const [finalDate, setFinalDate] = useState<String>("")

  const { careers } = useCareer()
  const { teachers } = useUser()
  const { subjects } = useSubject()
  const { createTask } = useTasks()

  const handleCreateTask = async (e: any): Promise<void> => {
    e.preventDefault()
    const taskData: Object = {
      career: guests,
      teacher,
      subject,
      semester,
      title,
      description,
      initialDate,
      finalDate,
    }
    const data: any = await createTask(taskData)
    if (data?.state) {
      setGuests("")
      setTeacher("")
      setSubject("")
      setSemester(0)
      setTitle("")
      setDescription("")
      setInitialDate("")
      setFinalDate("")
    }
    alert(data?.msg)
  }

  return (
    <AdminLayout>
      <div className="min-h-screen w-full bg-sky-600">
        <section className="w-full pt-[50px] pb-10">
          <form
            onSubmit={handleCreateTask}
            className=" mx-4 md:mx-auto md:w-1/2"
          >
            <legend className="text-center text-4xl text-white font-black mb-10">
              Create a task
            </legend>
            <select
              value={String(guests)}
              onChange={(e) => setGuests(String(e.target.value))}
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
            <select
              value={String(teacher)}
              onChange={(e) => setTeacher(String(e.target.value))}
              className="p-2 rounded-full w-full mb-2"
            >
              <option value={""}>Select task creator </option>
              {teachers?.length
                ? teachers.map((tch: User) => (
                    <option key={String(tch?._id)} value={String(tch?._id)}>
                      {tch?.personalData?.firstName}{" "}
                      {tch?.personalData?.lastName}
                    </option>
                  ))
                : null}
            </select>
            <div className="flex gap-2 flex-col md:flex-row">
              <select
                value={String(subject)}
                onChange={(e) => setSubject(String(e.target.value))}
                className="p-2 rounded-full w-full mb-2"
              >
                <option value={0}>Select a subject </option>
                {subjects?.length
                  ? subjects.map((sbj: Subject) => (
                      <option key={String(sbj?._id)} value={String(sbj?._id)}>
                        {sbj?.name}
                      </option>
                    ))
                  : null}
              </select>
              <select
                value={Number(semester)}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="p-2 rounded-full w-full mb-2"
              >
                <option value={0}>Select a semester number </option>
                {semesterOptions?.length
                  ? semesterOptions.map((semester) => (
                      <option key={semester.value} value={semester.value}>
                        {semester.opt}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">Title</label>
              <input
                type="text"
                value={String(title)}
                onChange={(e) => setTitle(String(e.target.value))}
                className="p-2 rounded-full"
                placeholder="Student name"
              />
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">
                Description
              </label>
              <textarea
                name=""
                value={String(description)}
                onChange={(e) => setDescription(String(e.target.value))}
                id=""
                className="w-full h-32 rounded-md"
              ></textarea>
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">files</label>
              <input type="file" />
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">
                initial date
              </label>
              <input
                type="date"
                value={String(initialDate)}
                onChange={(e) => setInitialDate(String(e.target.value))}
              />
            </div>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">final date</label>
              <input
                type="date"
                value={String(finalDate)}
                onChange={(e) => setFinalDate(String(e.target.value))}
              />
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

export default CreateTask
