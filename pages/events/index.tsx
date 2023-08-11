import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/layouts/Layout'
import { Event } from '../../helpers/interfaces'
import useAuth from '../../hooks/useAuth'
import LargeCardEvent from '../../components/LargeCardEvent'
import BackRoute from '../../components/layouts/BackRoute'
import formatDate from '../../helpers/formatDate'
import { comparerDates } from '../../helpers/comparerDates'

const index = () => {
  const [events,setEvents] = useState<Array<Event>>([])
  const [eventsShow,setEventsShow] = useState<Array<Event>>([])
  const {auth,loading} = useAuth()

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
        fetch(`http://localhost:4000/api/event/get-student-events/${auth._id}`,init).then(res => res.json()).then(data => setEvents(data))        }
      call()

    },[auth])
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
    auth?._id && !loading ?  (
      <Layout>
        <div className="min-h-screen w-full bg-sky-600">
          
          <section className="w-full pt-[100px]">
            <div>
            <h1 className="text-center text-4xl text-white font-black my-5">Events</h1>
            <div>
                {
                  eventsShow?.length ? (
                    <ul className='md:w-2/3 mx-auto'>
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
            
            </div>
          </section>
        </div>
    </Layout>
  ): !loading ? (
    <BackRoute/>
  ):null
  )
}

export default index