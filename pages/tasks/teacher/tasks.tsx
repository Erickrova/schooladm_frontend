import React, { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { Task } from '../../../helpers/interfaces'
import LargeCardTask from '../../../components/LargeCardTask'
import useTasks from '../../../hooks/useTasks'
import TasksLayoutTeacher from '../../../components/layouts/TasksLayoutTeacher'

const TeacherTasks = () => {
  const [tasks,setTasks] = useState<Array<Task>>([])
  const {auth} = useAuth()
  const {getTeacherTask} = useTasks()
  useEffect(()=>{
    const call = async () =>{
      if(auth){
        const data = await getTeacherTask(auth)
        setTasks(data)
      }
      }
      call()
    },[auth])
  return (
    <TasksLayoutTeacher>
      <div>
        <h1 className="text-center text-4xl text-white font-black my-5">My Tasks</h1>
        <div>
        {
                tasks?.length ? (
                    <ul className='md:w-2/3 mx-auto px-4'>
                        {
                            tasks.map(task => (
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
  </TasksLayoutTeacher>
  )
}


export default TeacherTasks