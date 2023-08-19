import TasksLayout from "../../components/layouts/TasksLayout"
import LargeCardTask from "../../components/cards/LargeCardTask"
import useTasks from "../../hooks/useTasks"

const QualifiedTasks = () => {
  const { studentQualifiedTasks } = useTasks()
  return (
    <TasksLayout>
      <div>
        <h1 className="text-center text-4xl text-white font-black my-5">
          Qualified Tasks
        </h1>
        <div>
          {studentQualifiedTasks?.length ? (
            <ul className="md:w-2/3 mx-auto px-4">
              {studentQualifiedTasks.map((task: any) => (
                <LargeCardTask key={task.task._id} data={task.task} />
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

export default QualifiedTasks
