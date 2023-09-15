import Link from "next/link"
import React from "react"

const QualificationCard = ({ data, task }: any) => {
  return (
    <Link
      href={`/tasks/task/${data?._id}`}
      className="w-full bg-white rounded-lg flex gap-2 px-2 py-1 text-xl mb-2 my-2"
    >
      <div className="w-2/3">
        <p
          data-testid="qualificationcardtitle"
          className="text-gray-800 hover:text-gray-500 transition-colors"
        >
          {data.title}
        </p>
        <p className="text-sm text-gray-800 hover:text-gray-500 transition-colors">
          Qualification: {task?.qualification}
        </p>
      </div>
      <p className="w-1/3 text-gray-800 hover:text-gray-500 transition-colors text-right">
        View Task
      </p>
    </Link>
  )
}

export default QualificationCard
