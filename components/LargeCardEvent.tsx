import Link from 'next/link'
import React from 'react'

const LargeCardEvent = ({data}:any) => {
  return (
    <Link href={`/events/event/${data?._id}`} className='w-full bg-white rounded-lg flex gap-2 px-2 py-1 text-xl mb-2'>
    <p className='w-2/3 text-gray-800 hover:text-gray-500 transition-colors'>{data?.title}</p>
    <p className='w-1/3 text-gray-800 hover:text-gray-500 transition-colors text-right'>View Event</p>
</Link>
  )
}

export default LargeCardEvent