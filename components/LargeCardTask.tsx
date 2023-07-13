import Link from 'next/link'
import React from 'react'
import useAuth from '../hooks/useAuth'

const LargeCardTask = ({data}:any) => {
  const {auth}=useAuth()
  return (
    auth?.rank == 1 ? (
      <Link href={`/tasks/task/${data?._id}`} className='w-full bg-white rounded-lg flex gap-2 px-2 py-1 text-xl mb-2'>
        <p className='w-2/3 text-gray-800 hover:text-gray-500 transition-colors'>{data?.title}</p>
        <p className='w-1/3 text-gray-800 hover:text-gray-500 transition-colors text-right'>View Task</p>
      </Link>
      ):(
      <Link href={`/tasks/teacher/task/${data?._id}`} className='w-full bg-white rounded-lg flex gap-2 px-2 py-1 text-xl mb-2'>
        <p className='w-2/3 text-gray-800 hover:text-gray-500 transition-colors'>{data?.title}</p>
        <p className='w-1/3 text-gray-800 hover:text-gray-500 transition-colors text-right'>View Task</p>
      </Link>
      )
  )
}

export default LargeCardTask