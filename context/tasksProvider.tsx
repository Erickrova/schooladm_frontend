import { createContext, useEffect, useState } from "react"
import {
  ChildrenProps,
  CompletedTask,
  Task,
  TaskSent,
} from "../helpers/interfaces"
import useAuth from "../hooks/useAuth"
import formatDate from "../helpers/formatDate"
import { comparerDates } from "../helpers/comparerDates"

const TasksContext = createContext<any>(null)

const TasksProvider = ({ children }: ChildrenProps) => {
  const [tasks, setTasks] = useState<Array<Task>>([])
  const [studentTasks, setStudentTasks] = useState<Array<Task>>([])
  const [studentPendingTasks, setStudentPendingTasks] = useState<Array<Task>>(
    [],
  )
  const [studentQualifiedTasks, setStudentQualifiedTasks] = useState<
    Array<any>
  >([])
  const [studentDeliveredTasks, setStudentDeliveredTasks] = useState<
    Array<Task>
  >([])

  const { auth } = useAuth()

  /**
   * hides tasks that finalDate was passed
   * @param {Array<Task>} tasksFilter tasks to filter
   * @param {Boolean} specialTaskFilter active special filter
   * @returns {Array<Tasks>} return tasks filter
   */
  const hiddingTasks = (
    tasksFilter: Array<Task>,
    specialTaskFilter?: boolean,
  ): Array<Task> => {
    const activeTasks = tasksFilter.filter((task: any) => {
      if (specialTaskFilter) {
        const taskDate = formatDate(task.task.finalDate)
          .split("/")
          .reverse()
          .join("-")
        const currentDate = formatDate(Date.now())
          .split("/")
          .reverse()
          .join("-")
        const result = comparerDates(currentDate, taskDate)
        if (result == 2 || result == 0) return task
      } else if (task.finalDate) {
        const taskDate = formatDate(task.finalDate)
          .split("/")
          .reverse()
          .join("-")
        const currentDate = formatDate(Date.now())
          .split("/")
          .reverse()
          .join("-")
        const result = comparerDates(currentDate, taskDate)
        if (result == 2 || result == 0) return task
      }
    })
    return activeTasks
  }

  //* GET functions

  const getTask = async (id: string): Promise<Task> => {
    const token = localStorage.getItem("token")
    if (!token || !id) {
      throw new Error("something wrong")
    }
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    const data = fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/get-task/${id}`,
      init,
    )
      .then((res) => res.json())
      .then((data: Task) => data)
    return data
  }
  const getTeacherTask = async (teacherId: string): Promise<Array<Task>> => {
    const token = localStorage.getItem("token")
    if (!token || !auth._id) {
      throw new Error("something wrong")
    }
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    const data = fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/get-teacher-tasks/${teacherId}`,
      init,
    )
      .then((res) => res.json())
      .then((data: Array<Task>) => data)
    return data
  }
  const getStudentSentTask = async (
    taskId: string,
    userId: string,
  ): Promise<CompletedTask> => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("something Wrong")
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/get-student-sent-task/${taskId}/${userId}`,
        init,
      )
        .then((res) => res.json())
        .then((data) => data)
      return data
    } catch (error) {
      throw new Error("something Wrong")
    }
  }
  //* POST functions

  /**
   * @param {TaskSent} props {file:string,taskId:string,studentId:string}
   */
  const sendTask = async ({ ...props }: TaskSent): Promise<boolean> => {
    const token = localStorage.getItem("token")
    if (!token || !props.file || !props?.taskId || !props.studentId) {
      throw new Error("something wrong")
    }
    try {
      const studentTask = {
        student: props.studentId,
        file: props.file,
      }
      const init = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: props.taskId, studentTask }),
      }

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/sendTask`, init)
        .then((res) => res.json())
        .then((data) => console.log(data))

      // synchronizing the state
      const tasksFilters: Array<Task> = studentPendingTasks.filter(
        (task: Task) => task._id !== props.taskId,
      )
      const delivetedTask: Task = tasks.find(
        (task: Task) => task._id == props.taskId,
      ) ?? { _id: "" }

      setStudentDeliveredTasks((prev) => [...prev, delivetedTask])
      setStudentPendingTasks(tasksFilters)

      return true
    } catch (error) {
      throw new Error("something wrong")
    }
  }
  const createTask = async (taskData: Object): Promise<Object> => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("something wrong")
    const init: Object = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      body: JSON.stringify(taskData),
    }
    try {
      const data: Object = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/create`,
        init,
      )
        .then((res) => res.json())
        .then((data) => data)
      return data
    } catch (error) {
      throw new Error("something wrong")
    }
  }
  const qualifyTask = async (data: Object): Promise<string> => {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("something wrong")
    }
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
    try {
      const msg = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/qualify-task`,
        init,
      )
        .then((res) => res.json())
        .then((msg: any) => msg.msg)
      return msg
    } catch (error) {
      throw new Error("something wrong")
    }
  }
  //* DELETE functions

  const deleteTask = async (id: string): Promise<Boolean> => {
    const token = localStorage.getItem("token")
    if (!token || !id) {
      throw new Error("something wrong")
    }
    const init = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/delete/${id}`,
      init,
    )
      .then((res) => res.json())
      .then((data) => data)
    alert(data.msg)
    if (data.status) {
      const newTasks: Array<Task> = tasks.filter((task) => task._id == id)
      const newStudentTasks: Array<Task> = studentTasks.filter(
        (task) => task._id == id,
      )
      setTasks(newTasks)
      setStudentTasks(newStudentTasks)
      return true
    }
    return false
  }

  //* useEffects

  useEffect(() => {
    const call = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        console.log("something wrong")
        return
      }
      const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/get-tasks`, init)
        .then((res) => res.json())
        .then((data) => setTasks(data))
      if (auth.rank == 1) {
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/get-student-tasks/${auth._id}`,
          init,
        )
          .then((res) => res.json())
          .then((data) => setStudentTasks(data))
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/get-qualified-tasks/${auth._id}`,
          init,
        )
          .then((res) => res.json())
          .then((data) => {
            const hiddenData = hiddingTasks(data, true)
            setStudentQualifiedTasks(hiddenData)
          })
      }
    }
    if (auth._id) {
      call()
    }
  }, [auth])
  // filter student delivered Tasks
  useEffect(() => {
    if (auth._id && studentTasks.length) {
      const filterTasks: Array<Task> = studentTasks.filter(
        (task: Task) =>
          task?.studentsCompletedTasks?.some(
            (completedTask: CompletedTask) =>
              completedTask?.student == auth?._id &&
              !completedTask.qualification,
          ),
      )
      const deliveredTasksFilter = hiddingTasks(filterTasks)
      setStudentDeliveredTasks(deliveredTasksFilter)
    }
  }, [studentTasks, auth])
  // filter student pending Tasks
  useEffect(() => {
    const filterTasks: Array<Task> = studentTasks.filter(
      (task: Task) =>
        !task?.studentsCompletedTasks?.some(
          (completedTask: CompletedTask) => completedTask?.student == auth?._id,
        ),
    )
    const pendingTasksFilter = hiddingTasks(filterTasks)
    setStudentPendingTasks(pendingTasksFilter)
  }, [studentTasks, auth])

  return (
    <TasksContext.Provider
      value={{
        sendTask,
        getTask,
        getTeacherTask,
        createTask,
        deleteTask,
        qualifyTask,
        hiddingTasks,
        tasks,
        setTasks,
        studentTasks,
        setStudentTasks,
        studentQualifiedTasks,
        setStudentQualifiedTasks,
        studentDeliveredTasks,
        setStudentDeliveredTasks,
        studentPendingTasks,
        setStudentPendingTasks,
        getStudentSentTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export { TasksContext }

export default TasksProvider
