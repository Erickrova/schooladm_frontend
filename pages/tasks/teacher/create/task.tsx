import React, { useEffect, useState } from "react"
import { Careers, Subject, User } from "../../../../helpers/interfaces"
import TasksLayout from "../../../../components/layouts/TasksLayout"
import useAuth from "../../../../hooks/useAuth"
import useTasks from "../../../../hooks/useTasks"
import semesterOptions from "../../../../helpers/semesterOptions"
import useCareer from "../../../../hooks/useCareer"
import useSubject from "../../../../hooks/useSubject"

const TeacherCreateTask = () => {
  const [guests, setGuests] = useState<String>("")
  const [subject, setSubject] = useState<String>("")
  const [semester, setSemester] = useState<Number>(0)
  const [title, setTitle] = useState<String>("")
  const [description, setDescription] = useState<String>("")
  const [initialDate, setInitialDate] = useState<String>("")
  const [finalDate, setFinalDate] = useState<String>("")

  const { auth } = useAuth()
  const { careers } = useCareer()
  const { subjects } = useSubject()
  const { createTask } = useTasks()

  const handleCreateTask = async (e: any): Promise<void> => {
    e.preventDefault()

    if (
      !guests ||
      !subject ||
      !semester ||
      !title ||
      !description ||
      !initialDate ||
      !finalDate
    ) {
      console.error("something is wrong")
      return
    }
    const taskData: Object = {
      career: guests,
      teacher: auth?._id,
      subject,
      semester,
      title,
      description,
      initialDate,
      finalDate,
    }
    const data = await createTask(taskData)
    if (data?.state) {
      setGuests("")
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
    <TasksLayout>
      <section className="w-full pt-5 pb-5">
        <form onSubmit={handleCreateTask} className=" mx-4 md:mx-auto md:w-1/2">
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
            {careers.map((careerr: Careers) => (
              <option key={String(careerr?._id)} value={String(careerr?._id)}>
                {careerr?.name}{" "}
              </option>
            ))}
          </select>
          <div className="flex gap-2 flex-col md:flex-row">
            <select
              value={String(subject)}
              onChange={(e) => setSubject(String(e.target.value))}
              className="p-2 rounded-full w-full mb-2"
            >
              <option value={0}>Select a subject </option>
              {subjects.map((sbj: Subject) => (
                <option key={String(sbj?._id)} value={String(sbj?._id)}>
                  {sbj?.name}
                </option>
              ))}
            </select>
            <select
              value={Number(semester)}
              onChange={(e) => setSemester(Number(e.target.value))}
              className="p-2 rounded-full w-full mb-2"
            >
              <option value={0}>Select a semester number </option>
              {semesterOptions.map((semester) => (
                <option key={semester.value} value={semester.value}>
                  {semester.opt}
                </option>
              ))}
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
            <label className="text-xl font-bold text-white">Description</label>
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
            <label className="text-xl font-bold text-white">initial date</label>
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
    </TasksLayout>
  )
}

export default TeacherCreateTask
