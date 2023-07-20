import React, { useEffect, useState } from 'react'
import Layout from '../../../components/layouts/Layout'
import { useRouter } from 'next/router'
import useAuth from '../../../hooks/useAuth'
import BackRoute from '../../../components/layouts/BackRoute'
import { Event } from '../../../helpers/interfaces'

const EventTarget = () => {
    const [event,setEvent] = useState<Event>()
    const [initialDate,setInitialDate] = useState<string>("")
    const [finalDate,setFinalDate] = useState<string>("")
    const [isConfirm,setIsConfirm] = useState<boolean>(true)
    const {auth,loading} = useAuth()
    const router = useRouter()
    const {id} = router.query

    const deleteEvent = async (id:any)=>{
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
    const confirmGuest = async (id:any,uid:any)=>{
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
          method:"PUT",
          headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/event/confirm/guest/${id}/${uid}`,init).then(res => res.json()).then(data => data)
        if(data?.status == true){
          setIsConfirm(true)
        }else{
          setIsConfirm(false)
        }
    }

    useEffect(()=>{
        const call = async () =>{
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
              method:"GET",
              headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
              }
            }
            fetch(`http://localhost:4000/api/event/get-event/${id}`,init).then(res => res.json()).then(data => setEvent(data))
          }
          call()
    },[id])
    useEffect(()=>{
      if(event){
        const initialdate = event?.initialDate ?? ""
        const realinitialdate = initialdate.split("T")[0]
        const finaldate = event?.finalDate ?? ""
        const realfinaldate = finaldate.split("T")[0]
        setInitialDate(realinitialdate)
        setFinalDate(realfinaldate)
      }
    },[event])
    useEffect(()=>{
      if(event?._id && event?.confirmGuests){
        const confirmed = event?.confirmGuests.some(guest => guest == auth?._id)
        if(confirmed){
          setIsConfirm(true)
        }else{
          setIsConfirm(false)
        }
      }else{
        setIsConfirm(false)
      }
    },[event])
  return (
    auth?._id && !loading ?  (
    <Layout>
        <div className="min-h-screen w-full bg-sky-600">
          
          <section className="w-full overflow-hidden pt-[100px]">
            <div className='flex justify-center items-center gap-4 px-4 md:px-0'>
                <h2 className='text-3xl font-bold text-white'>{event?.title}</h2>
                {auth?.rank > 2 ?(

                  <button onClick={()=> deleteEvent(id)} className=' bg-red-500 hover:bg-red-700 rounded-lg px-2 py-1 text-xl text-white transition-colors text-center font-bold uppercase'>delete</button>
                ):null}
            </div>
            <div className=' md:w-2/3 px-10 pt-10 flex flex-col md:flex-row gap-4'>
                <p className='text-sm font-bold text-white'>From: {initialDate}</p>
                <p className='text-sm font-bold text-white'>To: {finalDate}</p>
            </div>
            <div className='flex flex-col md:flex-row '>
                <div className='md:w-2/3 mb-10 md:mb-0 flex flex-col justify-center items-center md:max-h-[500px] px-10 overflow-y-auto'>
                    <div className='h-[300px] overflow-y-auto p-2 rounded-t-md bg-slate-400 bg-opacity-20 w-full'>
                        <p className=' text-white text-center text-xl font-bold'>event description</p>
                        <p className=' text-white'>{event?.description}</p>
                    </div>
                    <div className='md:w-full max-h-[200px] overflow-y-auto flex flex-wrap gap-2 p-2 bg-slate-400 bg-opacity-20 border-t-2 rounded-b-md'>
                        <div className='w-[150px] h-[150px] bg-sky-400'></div>
                        <div className='w-[150px] h-[150px] bg-blue-400'></div>
                        <div className='w-[150px] h-[150px] bg-sky-400'></div>
                        <div className='w-[150px] h-[150px] bg-blue-400'></div>
                        <div className='w-[150px] h-[150px] bg-sky-400'></div>
                        <div className='w-[150px] h-[150px] bg-blue-400'></div>
                        <div className='w-[150px] h-[150px] bg-sky-400'></div>
                        <div className='w-[150px] h-[150px] bg-blue-400'></div>
                        <div className='w-[150px] h-[150px] bg-sky-400'></div>
                        <div className='w-[150px] h-[150px] bg-blue-400'></div>
                        <p className='text-2xl text-white'>event files</p>
                    </div>
                </div>
                <div className='md:w-1/3 px-5 flex flex-col justify-center items-center'>
                    <p className='text-2xl font-bold text-white'>{isConfirm ? "your presence was confirmed" : "confirm your presence"}</p>
                        <button onClick={()=> confirmGuest(id,auth?._id)} className={`w-full px-2 py-1 ${isConfirm ? "bg-green-400 hover:bg-green-500" : "bg-sky-400 hover:bg-sky-500"}   text-white font-bold rounded-md cursor-pointer  transition-colors my-5 capitalize`} >{isConfirm ? "disconfirm" : "confirm"}</button>
                </div>
            </div>
          </section>
        </div>
    </Layout>
    ):!loading ? (
      <BackRoute/>
    ):null
    )
}

export default EventTarget