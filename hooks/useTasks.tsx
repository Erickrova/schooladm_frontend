import { useContext } from "react"
import { TasksContext } from "../context/tasksProvider"
import { TaskContext } from "../helpers/interfaces"

const useTasks: any = (): TaskContext => {
  return useContext(TasksContext)
}

export default useTasks
