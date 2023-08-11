import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { Event } from '../../../helpers/interfaces'
import LargeCardEvent from '../../../components/LargeCardEvent'
import formatDate from '../../../helpers/formatDate'
import { comparerDates } from '../../../helpers/comparerDates'

const Events = () => {
    const [events,setEvents] = useState<Array<Event>>([])
    const [eventsShow,setEventsShow] = useState<Array<Event>>([])
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
      useEffect(()=>{
        if(events){
            // filtering the events whose finalDate has already passed
            const activeEvents = events.filter(event =>{
                if(event.finalDate){
                    const eventDate = formatDate(event.finalDate).split("/").reverse().join("-")
                    const currentDate = formatDate(String(Date.now())).split("/").reverse().join("-")
                    const result = comparerDates(currentDate,eventDate)
                    if(result == 1 || result == 0 ) event
                }
            })
            setEventsShow(activeEvents)
        }
      },[events])
  return (
    <AdminLayout>
        <section className="h-full w-full bg-sky-600">
            <h1 className='pt-[50px] text-center text-4xl text-white font-black mb-10'>Events</h1>
            <div>
                {
                    eventsShow?.length ? (
                        <ul className='md:w-2/3 mx-auto max-h-[500px] pr-4 overflow-y-scroll'>
                            {
                                eventsShow.map(event => (
                                    <LargeCardEvent key={event?._id} data={event} />
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