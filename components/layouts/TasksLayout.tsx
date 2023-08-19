import Link from "next/link"
import Layout from "../../components/layouts/Layout"
import useAuth from "../../hooks/useAuth"
import BackRoute from "./BackRoute"
import { ChildrenProps } from "../../helpers/interfaces"

const TasksLayout = ({ children }: ChildrenProps): JSX.Element | null => {
  const { auth, loading } = useAuth()
  return auth?._id && !loading ? (
    <Layout>
      <div className="min-h-screen w-full bg-sky-600">
        <section className="w-full pt-[100px]">
          <div>
            <nav className="flex gap-4 justify-evenly p-2 border-y-2 mt-4">
              {auth?.rank == 1 ? (
                <>
                  <Link
                    href={"/tasks"}
                    className="text-white hover:text-red-100 transition-colors"
                  >
                    Pending Tasks
                  </Link>
                  <Link
                    href={"/tasks/delivered-tasks"}
                    className="text-white hover:text-red-100 transition-colors"
                  >
                    Delivered Tasks
                  </Link>
                  <Link
                    href={"/tasks/qualified-tasks"}
                    className="text-white hover:text-red-100 transition-colors"
                  >
                    Qualified Tasks
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={"/tasks/teacher/tasks"}
                    className="text-white hover:text-red-100 transition-colors"
                  >
                    My Tasks
                  </Link>
                  <Link
                    href={"/tasks/teacher/create/task"}
                    className="text-white hover:text-red-100 transition-colors"
                  >
                    Create Task
                  </Link>
                </>
              )}
            </nav>
          </div>
          {children}
        </section>
      </div>
    </Layout>
  ) : !loading ? (
    <BackRoute />
  ) : null
}

export default TasksLayout
