import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useAuth from '../../../../hooks/useAuth'
import { CompletedTask, Task } from '../../../../helpers/interfaces'
import SentTaskCard from '../../../../components/SentTaskCard'
import TasksLayoutTeacher from '../../../../components/layouts/TasksLayoutTeacher'

const TeacherTask = () => {
  const [task,setTask] = useState<Task>()
  const [initialDate,setInitialDate] = useState<String>()
  const [finalDate,setFinalDate] = useState<String>()
  const [sentTasks,setSentTasks] = useState<Array<CompletedTask>>([])
  const {auth} = useAuth()
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
          fetch(`http://localhost:4000/api/task/get-task/${id}`,init).then(res => res.json()).then(data => setTask(data))
        }
        call()
  },[id])
  useEffect(()=>{
    if(task){
      const call = async ()=>{
        const token = localStorage.getItem("token")
        if(!token){
          console.log("something wrong")
          return
        }
        if(!task?._id){
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
         fetch(`http://localhost:4000/api/task/get-sent-tasks/${task?._id}`,init).then(res => res.json()).then(data => setSentTasks(data))
        }
      call()
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
  <TasksLayoutTeacher>

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
              <div className='md:w-1/3 px-5 flex flex-col items-center h-[800px] overflow-y-auto'>
                <p className='text-2xl font-bold text-white mb-2'>Sent Tasks</p>
                {
                sentTasks?.length ? (
                    <ul className='md:w-2/3 mx-auto px-4'>
                        {
                            sentTasks.map(tsk => (
                                <SentTaskCard key={tsk?._id} data={tsk} task={task} />   
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
        ):(<p>loading</p>)}
      </div>
  </TasksLayoutTeacher>
)
}

export default TeacherTask