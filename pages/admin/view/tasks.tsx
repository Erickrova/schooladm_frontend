import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { Task } from '../../../helpers/interfaces'
import LargeCardTask from '../../../components/LargeCardTask'

const Tasks = () => {
    const [tasks,setTasks] = useState<Array<Task>>([{}])
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
          fetch("http://localhost:4000/api/task/get-tasks",init).then(res => res.json()).then(data => setTasks(data))        }
        call()
  
      },[])
  return (
    <AdminLayout>
        <section className="h-full overflow-hidden w-full bg-sky-600">
            <h1 className='pt-[50px] text-center text-4xl text-white font-black mb-10'>Tasks</h1>
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
                    tasks?.length ? (
                        <ul className='md:w-2/3 mx-auto max-h-[500px] pr-4 overflow-y-auto'>
                            {
                                tasks.map(task => (
                                    <LargeCardTask key={task?._id} data={task} />
                                    // <li className='p-2 rounded-full w-full mb-2 text-xl font-bold bg-white'>{task?.title}</li>      
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

export default Tasks