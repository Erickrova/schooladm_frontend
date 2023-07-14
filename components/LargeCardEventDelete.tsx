import Link from 'next/link'
import React from 'react'

const LargeCardEventDelete = ({data}:any) => {
  const deleteEvent = (id:any)=>{
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
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/event/delete/${id}`,init).then(res => res.json()).then(data => alert(data.msg))
    }
      
    }
    return (
    <div className='w-full flex mb-2'>
      <Link href={`/events/event/${data?._id}`} className='w-3/4 bg-white rounded-l-lg flex justify-center items-center gap-2 px-2 py-1 text-xl'>
          <p className='w-2/3 text-gray-800 hover:text-gray-500 transition-colors'>{data?.title}</p>
          <p className='w-1/3 text-gray-800 hover:text-gray-500 transition-colors text-right'>View Event</p>
      </Link>
      <button onClick={()=> deleteEvent(data?._id)} className='w-1/4 bg-red-500 hover:bg-red-700 rounded-r-lg px-2 py-1 text-xl text-white transition-colors text-center font-bold uppercase'>delete</button>
    </div>
  )
}

export default LargeCardEventDelete