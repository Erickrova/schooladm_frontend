import React, { useEffect, useState } from "react"
import AdminLayout from "../../../components/layouts/AdminLayout"
import { Task } from "../../../helpers/interfaces"
import LargeCardTask from "../../../components/cards/LargeCardTask"
import formatDate from "../../../helpers/formatDate"
import { comparerDates } from "../../../helpers/comparerDates"
import useTasks from "../../../hooks/useTasks"

const Tasks = () => {
  const [tasksShow, setTasksShow] = useState<Array<Task>>([])
  const { tasks } = useTasks()
  useEffect(() => {
    if (tasks) {
      // filtering the events whose finalDate has already passed
      const activeTasks = tasks.filter((task: Task) => {
        if (task.finalDate) {
          const taskDate = formatDate(task.finalDate)
            .split("/")
            .reverse()
            .join("-")
          const currentDate = formatDate(String(Date.now()))
            .split("/")
            .reverse()
            .join("-")
          const result = comparerDates(currentDate, taskDate)
          if (result == 1 || result == 0) return task
        }
      })
      setTasksShow(activeTasks)
    }
  }, [tasks])
  return (
    <AdminLayout>
      <section className="h-full overflow-hidden w-full bg-sky-600">
        <h1 className="pt-[50px] text-center text-4xl text-white font-black mb-10">
          Tasks
        </h1>
        <form className=" mx-4 md:mx-auto md:w-1/2 flex">
          <select className="p-2 rounded-full w-full mb-2">
            <option value="">career</option>
          </select>

          <select className="p-2 rounded-full w-full mb-2">
            <option value="">semester</option>
          </select>
        </form>
        <div>
          {tasksShow?.length ? (
            <ul className="md:w-2/3 mx-auto max-h-[500px] pr-4 overflow-y-auto">
              {tasksShow.map((task) => (
                <LargeCardTask key={task?._id} data={task} />
              ))}
            </ul>
          ) : (
            <p className="pt-[50px] text-center text-4xl text-white font-black mb-10">
              no items
            </p>
          )}
        </div>
      </section>
    </AdminLayout>
  )
}

export default Tasks
