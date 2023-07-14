import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { Event } from '../../../helpers/interfaces'
import LargeCardEventDelete from '../../../components/LargeCardEventDelete'

const Events = () => {
    const [events,setEvents] = useState<Array<Event>>([{}])
    useEffect(()=>{
        const call = async () =>{
          const token = localStorage.getItem("token")
          if(!token){
            console.log("something wrong")
            return
          }
          const init = {
            method:"GET",
            headers:{
              'Content-Type':'application/json',
              Authorization: `Bearer ${token}`
            }
          }
          fetch("http://localhost:4000/api/event/get-events",init).then(res => res.json()).then(data => setEvents(data))        }
        call()
  
      },[])
  return (
    <AdminLayout>
        <section className="h-full w-full bg-sky-600">
            <h1 className='pt-[50px] text-center text-4xl text-white font-black mb-10'>Events</h1>
            <form className=' mx-4 md:mx-auto md:w-1/2 flex'>
                <select className='p-2 rounded-full w-full mb-2'>
                    <option value="">career</option>
                </select>

                <select className='p-2 rounded-full w-full mb-2'>
                    <option value="">semester</option>
                </select>
            </form>
            <div>
                {
                    events?.length ? (
                        <ul className='md:w-2/3 mx-auto max-h-[500px] px-4  overflow-y-scroll'>
                            {
                                events.map(event => (
                                    <LargeCardEventDelete key={event?._id} data={event} />
                                    // <li className='p-2 rounded-full w-full mb-2 text-xl font-bold bg-white'>{event?.title} {event?.title}</li>
                                ))
                            }
                        </ul>
                    ):(
                        <p className='pt-[50px] text-center text-4xl text-white font-black mb-10'>no items</p>
                    )
                }
            </div>
        </section>

    </AdminLayout>
  )
}

export default Events