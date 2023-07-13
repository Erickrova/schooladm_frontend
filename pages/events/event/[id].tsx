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
    const {auth,loading} = useAuth()
    const router = useRouter()
    const {id} = router.query
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
            fetch(`http://localhost:4000/api/event/get-event/647e77681f5e4b3478bcd162`,init).then(res => res.json()).then(data => setEvent(data))
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
  return (
    auth?._id && !loading ?  (
    <Layout>
        <div className="min-h-screen w-full bg-sky-600">
          
          <section className="w-full overflow-hidden pt-[100px]">
            <div className='flex justify-center items-center gap-4 px-4 md:px-0'>
                <h2 className='text-3xl font-bold text-white'>{event?.title}</h2>
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
                    <p className='text-2xl font-bold text-white'>confirm your presence</p>
                    <form className='flex flex-col justify-center items-center'>
                        <input className="w-full px-2 py-1 bg-sky-400 text-white font-bold rounded-md cursor-pointer hover:bg-sky-500 transition-colors my-5" type="submit" value="Confirm" />
                    </form>
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