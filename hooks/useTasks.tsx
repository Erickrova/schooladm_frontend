import { useContext } from "react";
import {TasksContext} from "../context/tasksProvider";


const useTasks = () => {
  return useContext(TasksContext)
}

export default useTasks