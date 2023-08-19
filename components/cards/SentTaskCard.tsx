import Link from "next/link"
import React from "react"

const SentTaskCard = ({ data, task }: any) => {
  return (
    <Link
      href={`/tasks/teacher/task/student/task/${task?._id}/${data?.student?._id}`}
      className="w-full bg-white rounded-lg flex gap-2 px-2 py-1 text-xl mb-2"
    >
      <div className="w-2/3">
        <p className="text-gray-800 hover:text-gray-500 transition-colors">
          {data?.student?.personalData?.firstName}{" "}
          {data?.student?.personalData?.lastName}
        </p>
        <p className="text-sm text-gray-800 hover:text-gray-500 transition-colors">
          Qualification: {data?.qualification}
        </p>
      </div>
      <p className="w-1/3 text-gray-800 hover:text-gray-500 transition-colors text-right">
        View Task
      </p>
    </Link>
  )
}

export default SentTaskCard
