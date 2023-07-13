import React, { useEffect, useState } from 'react'
import Layout from '../../../components/layouts/Layout'
import { useRouter } from 'next/router'
import useAuth from '../../../hooks/useAuth'
import { CompletedTask, Task } from '../../../helpers/interfaces'
import useTasks from '../../../hooks/useTasks'
import BackRoute from '../../../components/layouts/BackRoute'

const TaskTarget = () => {
    const [task,setTask] = useState<Task>()
    const [tsk,setTsk] = useState<string>("")
    const [initialDate,setInitialDate] = useState<string>("")
    const [finalDate,setFinalDate] = useState<string>("")
    const [qualification,setQualification] = useState<number>()
    const [studentTsk,setStudentTsk] = useState<CompletedTask>()
    const {auth,loading} = useAuth()
    const {sendTask,getTask} = useTasks()
    const router = useRouter()
    const {id} = router.query

    const handleSendTask = async (e:any) =>{
      e.preventDefault()
      await sendTask({tsk,id,auth})
    }
    useEffect(()=>{
      const call = async () =>{
        if(id){
          const data = await getTask(id)
          setTask(data)
        }
      }
      call()
    },[id])
    useEffect(()=>{
      if(task?.studentsCompletedTasks){
        const studentTk:CompletedTask = task?.studentsCompletedTasks.find((tsk:CompletedTask)=> tsk?.student == auth._id) ?? {}
        if(studentTk?.qualification != undefined && studentTk?.qualification >= 0){
          setQualification(studentTk.qualification)
        }
        setStudentTsk(studentTk)
      }
    },[task])
    useEffect(()=>{
      if(task){
        const initialdate = task?.initialDate ?? ""
        const realinitialdate = initialdate.split("T")[0]
        const finaldate = task?.finalDate ?? ""
        const realfinaldate = finaldate.split("T")[0]
        setInitialDate(realinitialdate)
        setFinalDate(realfinaldate)
      }
    },[task])
  return (
    auth?._id && !loading ?  (

      <Layout>

        <div className="min-h-screen w-full bg-sky-600">
          
      {task ? (
          <section className="w-full overflow-hidden pt-[100px]">
            <div className='flex justify-center items-center gap-4 px-4 md:px-0'>
                <h2 className='text-3xl font-bold text-white'>{task?.title}</h2>
            </div>
            <div className=' md:w-2/3 px-10 pt-10 flex flex-col md:flex-row gap-4'>
                <p className='text-sm font-bold text-white'>From: {initialDate}</p>
                <p className='text-sm font-bold text-white'>To: {finalDate}</p>
            </div>
            <div className='flex flex-col md:flex-row pt-1 '>

                <div className='md:w-2/3 mb-10 md:mb-0 flex flex-col justify-center items-center md:max-h-[500px] px-10 overflow-y-auto'>
                    <div className='h-[300px] overflow-y-auto p-2 rounded-t-md bg-slate-400 bg-opacity-20 w-full'>
                        <p className=' text-white text-center text-xl font-bold'>task description</p>
                        <p className=' text-white'>{task?.description}</p>
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
                        <p className='text-2xl text-white'>task files</p>
                    </div>
                </div>
                <div className='md:w-1/3 px-5 flex flex-col justify-center items-center'>
                      {studentTsk?.file?.length ?(
                        <p className='text-2xl font-bold text-white'>your task:</p>
                        ):(
                        <p className='text-2xl font-bold text-white'>write your task here</p>
                        )}
                    <form onSubmit={handleSendTask} className='flex flex-col justify-center items-center'>
                      {studentTsk?.file?.length ?(
                        <div>
                          <p className='w-full p-1 rounded-md bg-white'>{studentTsk?.file}</p>
                          {studentTsk?.qualification != undefined && studentTsk?.qualification >= 0 ? (

                            <p className={`w-full p-1 my-1 rounded-md text-white font-bold ${qualification != undefined && qualification >= 6 ? "bg-green-500" : "bg-red-500"}`}>Qualification: {qualification}</p>
                          ):null}
                        </div>
                        ):(
                          <>
                          <textarea value={tsk} onChange={e=> setTsk(e.target.value)} className='w-full'></textarea>
                          {/* <input className='w-full text-white' type="file" multiple/> */}
                          <input className="w-full px-2 py-1 bg-sky-400 text-white font-bold rounded-md cursor-pointer hover:bg-sky-500 transition-colors my-5" type="submit" value="Send Task" />
                        </>
                        )}
                    </form>
                </div>
            </div>
          </section>
          ):(<p>loading</p>)}
        </div>
    </Layout>
  ):!loading ?(
    <BackRoute/>
  ):null
  )
}

export default TaskTarget