import { Task } from "../../helpers/interfaces"
import LargeCardTask from "../../components/cards/LargeCardTask"
import TasksLayout from "../../components/layouts/TasksLayout"
import useTasks from "../../hooks/useTasks"

const DeliveredTasks = () => {
  const { studentDeliveredTasks } = useTasks()
  return (
    <TasksLayout>
      <div>
        <h1 className="text-center text-4xl text-white font-black my-5">
          Delivered Tasks
        </h1>
        {studentDeliveredTasks?.length ? (
          <ul className="md:w-2/3 mx-auto px-4">
            {studentDeliveredTasks.map((task: Task) => (
              <LargeCardTask key={task?._id} data={task} />
            ))}
          </ul>
        ) : (
          <p className="pt-[50px] text-center text-4xl text-white font-black mb-10">
            no items
          </p>
        )}
      </div>
    </TasksLayout>
  )
}

export default DeliveredTasks
