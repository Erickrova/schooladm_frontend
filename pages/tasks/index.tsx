import { Task } from "../../helpers/interfaces"
import LargeCardTask from "../../components/cards/LargeCardTask"
import TasksLayout from "../../components/layouts/TasksLayout"
import useTasks from "../../hooks/useTasks"

const TasksIndex = () => {
  const { studentPendingTasks } = useTasks()
  return (
    <TasksLayout>
      <div>
        <h1 className="text-center text-4xl text-white font-black my-5">
          Pending Tasks
        </h1>
        <div>
          {studentPendingTasks?.length ? (
            <ul className="md:w-2/3 mx-auto px-4">
              {studentPendingTasks.map((task: Task) => (
                <LargeCardTask key={task?._id} data={task} />
              ))}
            </ul>
          ) : (
            <p className="pt-[50px] text-center text-4xl text-white font-black mb-10">
              no items
            </p>
          )}
        </div>
      </div>
    </TasksLayout>
  )
}

export default TasksIndex
