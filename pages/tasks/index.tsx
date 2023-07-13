import React, { useEffect, useState } from 'react'
import { CompletedTask, Task } from '../../helpers/interfaces'
import useAuth from '../../hooks/useAuth'
import LargeCardTask from '../../components/LargeCardTask'
import TasksLayout from '../../components/layouts/TasksLayout'

const index = () => {
  const [tasks,setTasks] = useState<Array<Task>>([])
  const [pendingTasks,setPendingTasks] = useState<Array<Task>>([])
  const {auth} = useAuth()
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
        fetch(`http://localhost:4000/api/task/get-student-tasks/${auth._id}`,init).then(res => res.json()).then(data => setTasks(data))        }
      call()

    },[auth])
  useEffect(()=>{
    const filterTasks :Array<Task> = tasks.filter(task => !task?.studentsCompletedTasks?.some((completedTask:CompletedTask) => completedTask?.student== auth?._id) )
    setPendingTasks(filterTasks)
  },[tasks])
  return (
    <TasksLayout>
      <div>
          <h1 className="text-center text-4xl text-white font-black my-5">Pending Tasks</h1>
          <div>
            {
                pendingTasks?.length ? (
                    <ul className='md:w-2/3 mx-auto px-4'>
                        {
                            pendingTasks.map(task => (
                                <LargeCardTask key={task?._id} data={task} />   
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

export default index