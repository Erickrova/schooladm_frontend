import Link from "next/link"
import React from "react"
import useAuth from "../../hooks/useAuth"
import useUser from "../../hooks/useUser"

const LargeCardUser = ({ data }: any) => {
  const { deleteUser } = useUser()
  const { auth } = useAuth()
  const handleDeleteUser = async (id: any) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const data = await deleteUser(id)
      if (data.msg) {
        alert(data.msg)
      }
    }
  }
  return auth?.rank == 1 ? (
    <Link
      href={`/tasks/task/${data?._id}`}
      className="w-full bg-white rounded-lg flex gap-2 px-2 py-1 text-xl mb-2"
    >
      <p className="w-2/3 text-gray-800 hover:text-gray-500 transition-colors">
        {data?.personalData?.firstName} {data?.personalData?.lastName}
      </p>
      <p className="w-1/3 text-gray-800 hover:text-gray-500 transition-colors text-right">
        View User
      </p>
    </Link>
  ) : auth?.rank == 2 ? (
    <Link
      href={`/tasks/teacher/task/${data?._id}`}
      className="w-full bg-white rounded-lg flex gap-2 px-2 py-1 text-xl mb-2"
    >
      <p className="w-2/3 text-gray-800 hover:text-gray-500 transition-colors">
        {data?.personalData?.firstName} {data?.personalData?.lastName}
      </p>
      <p className="w-1/3 text-gray-800 hover:text-gray-500 transition-colors text-right">
        View User
      </p>
    </Link>
  ) : (
    <div className="w-full flex mb-2">
      <Link
        href={`/tasks/teacher/task/${data?._id}`}
        className="w-3/4 bg-white rounded-l-lg flex justify-center items-center gap-2 px-2 py-1 text-xl"
      >
        <p className="w-2/3 text-gray-800 hover:text-gray-500 transition-colors">
          {data?.personalData?.firstName} {data?.personalData?.lastName}
        </p>
        <p className="w-1/3 text-gray-800 hover:text-gray-500 transition-colors text-right">
          View User
        </p>
      </Link>
      <button
        onClick={() => handleDeleteUser(data?._id)}
        className="w-1/4 bg-red-500 hover:bg-red-700 rounded-r-lg px-2 py-1 text-xl text-white transition-colors text-center font-bold uppercase"
      >
        delete
      </button>
    </div>
  )
}

export default LargeCardUser
