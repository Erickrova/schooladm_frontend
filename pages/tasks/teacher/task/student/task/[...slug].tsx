import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { CompletedTask, Task } from "../../../../../../helpers/interfaces"
import TasksLayoutTeacher from "../../../../../../components/layouts/TasksLayoutTeacher"
import useTasks from "../../../../../../hooks/useTasks"

const StudentTask = () => {
  const [studentTask, setStudentTask] = useState<CompletedTask>()
  const [task, setTask] = useState<Task>()
  const [qualification, setQualification] = useState<number>(0)
  const router = useRouter()
  const { qualifyTask, getStudentSentTask, getTask } = useTasks()
  const { slug } = router.query

  const handleQualifyTask = async (e: any) => {
    e.preventDefault()
    if (qualification >= 0 && slug) {
      const data = { id: slug[0], ui: slug[1], qualification }
      const res = await qualifyTask(data)
      alert(res)
    }
  }
  useEffect(() => {
    const call = async () => {
      if (slug) {
        let data = await getStudentSentTask(slug[0], slug[1])
        setStudentTask(data)
        data = await getTask(slug[0])
        setTask(data)
      }
    }
    call()
  }, [slug, getStudentSentTask, getTask])
  useEffect(() => {
    if (
      studentTask?.qualification != undefined &&
      studentTask?.qualification >= 0
    ) {
      setQualification(studentTask.qualification)
    }
  }, [studentTask])
  return (
    <TasksLayoutTeacher>
      <div className="min-h-screen w-full bg-sky-600">
        {task ? (
          <section className="w-full overflow-hidden pt-[100px]">
            <div className="flex justify-center items-center gap-4 px-4 md:px-0">
              <h2 className="text-3xl font-bold text-white">{task?.title}</h2>
            </div>
            <div className="flex md:flex-row flex-col gap-5">
              <div className=" md:w-2/3 px-10 pt-10 flex flex-col gap-2">
                <p className="text-sm font-bold text-white capitalize">
                  STUDENT: {studentTask?.student?.personalData?.firstName}{" "}
                  {studentTask?.student?.personalData?.lastName}
                </p>
                <p className="text-sm font-bold text-white">
                  Delivered: {studentTask?.completedDate}
                </p>
                <p className="text-sm font-bold text-white">Task Delivered:</p>
                <p className="text-sm font-bold bg-white p-2 rounded-md">
                  {studentTask?.file}
                </p>
              </div>
              <div className="md:w-1/3 px-5 flex flex-col items-center h-[800px] overflow-y-auto">
                <form
                  onSubmit={handleQualifyTask}
                  className="flex flex-col justify-center items-center"
                >
                  <legend className="text-2xl font-bold text-white">
                    Qualify Task
                  </legend>
                  <input
                    type="number"
                    className="w-full p-1 rounded-md"
                    value={qualification}
                    onChange={(e) => setQualification(Number(e.target.value))}
                    min={0}
                    max={10}
                  />
                  <input
                    type="submit"
                    className="w-full px-2 py-1 bg-sky-400 text-white font-bold rounded-md cursor-pointer hover:bg-sky-500 transition-colors my-2"
                    value="Qualify"
                  />
                </form>
              </div>
            </div>
          </section>
        ) : (
          <p>loading</p>
        )}
      </div>
    </TasksLayoutTeacher>
  )
}

export default StudentTask
