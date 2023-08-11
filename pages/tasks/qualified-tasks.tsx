import React, { useEffect, useState } from 'react'
import TasksLayout from '../../components/layouts/TasksLayout'
import useAuth from '../../hooks/useAuth'
import LargeCardTask from '../../components/LargeCardTask'
import { Task } from '../../helpers/interfaces'
import formatDate from '../../helpers/formatDate'
import { comparerDates } from '../../helpers/comparerDates'

const QualifiedTasks = () => {
  const [qualifiedTasks,setQualifiedTasks] = useState<Array<Task>>([])
  const [tasksShow,setTasksShow] = useState<Array<Task>>([])
  const {auth} = useAuth()
  useEffect(()=>{
    const call = async () =>{
      const token = localStorage.getItem("token")
      if(!token || !auth?._id){
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
      fetch(`http://localhost:4000/api/task/get-qualified-tasks/${auth._id}`,init).then(res => res.json()).then(data => setQualifiedTasks(data))
    }
    call()

  },[auth])
  useEffect(()=>{
    if(qualifiedTasks){
        // filtering the events whose finalDate has already passed
        const activeTasks = qualifiedTasks.filter(task =>{
            if(task.finalDate){
                const taskDate = formatDate(task.finalDate).split("/").reverse().join("-")
                const currentDate = formatDate(String(Date.now())).split("/").reverse().join("-")
                const result = comparerDates(currentDate,taskDate)
                if(result == 1 || result == 0 ) task
            }
        })
        setTasksShow(activeTasks)
    }
  },[qualifiedTasks])
  return (
   <TasksLayout>
    <div>
      <h1 className="text-center text-4xl text-white font-black my-5">Qualified Tasks</h1>
      <div>
            {
                tasksShow?.length ? (
                    <ul className='md:w-2/3 mx-auto px-4'>
                        {
                            tasksShow.map((task:any) => (
                              <LargeCardTask key={task?._id} data={task.task} />   
                            ))
                        }
                    </ul>
                ):(
                    <p className='pt-[50px] text-center text-4xl text-white font-black mb-10'>no items</p>
                )
            }
        </div>
    </div>
   </TasksLayout>
  )
}

export default QualifiedTasks