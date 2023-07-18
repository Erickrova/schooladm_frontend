import Link from 'next/link'
import React from 'react'
import useAuth from '../hooks/useAuth'

const LargeCardTask = ({data}:any) => {
  const {auth}=useAuth()
  const deleteTask = (id:any)=>{
    if(confirm("Are you sure you want to delete this event?")){

      const token = localStorage.getItem("token")
      if(!token){
        console.log("something wrong")
        return
      }
      if(!id){
        console.log("something wrong")
        return
      }
      const init = {
        method:"DELETE",
        headers:{
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/delete/${id}`,init).then(res => res.json()).then(data => alert(data.msg))
    } 
    }
  return (
    auth?.rank == 1 ? (
      <Link href={`/tasks/task/${data?._id}`} className='w-full bg-white rounded-lg flex gap-2 px-2 py-1 text-xl mb-2'>
        <p className='w-2/3 text-gray-800 hover:text-gray-500 transition-colors'>{data?.title}</p>
        <p className='w-1/3 text-gray-800 hover:text-gray-500 transition-colors text-right'>View Task</p>
      </Link>
      ):auth?.rank == 2 ?(
      <Link href={`/tasks/teacher/task/${data?._id}`} className='w-full bg-white rounded-lg flex gap-2 px-2 py-1 text-xl mb-2'>
        <p className='w-2/3 text-gray-800 hover:text-gray-500 transition-colors'>{data?.title}</p>
        <p className='w-1/3 text-gray-800 hover:text-gray-500 transition-colors text-right'>View Task</p>
      </Link>
      ):(
        <div className='w-full flex mb-2'>
      <Link href={`/tasks/teacher/task/${data?._id}`} className='w-3/4 bg-white rounded-l-lg flex justify-center items-center gap-2 px-2 py-1 text-xl'>
          <p className='w-2/3 text-gray-800 hover:text-gray-500 transition-colors'>{data?.title}</p>
          <p className='w-1/3 text-gray-800 hover:text-gray-500 transition-colors text-right'>View Event</p>
      </Link>
      <button onClick={()=> deleteTask(data?._id)} className='w-1/4 bg-red-500 hover:bg-red-700 rounded-r-lg px-2 py-1 text-xl text-white transition-colors text-center font-bold uppercase'>delete</button>
    </div>
      )
  )
}

export default LargeCardTask