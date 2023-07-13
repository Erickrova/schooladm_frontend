import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { User } from '../../../helpers/interfaces'

const Teachers = () => {
    const [teachers,setTeachers] = useState<Array<User>>([{}])
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
          fetch("http://localhost:4000/api/user/get-teachers",init).then(res => res.json()).then(data => setTeachers(data))        }
        call()
  
      },[])
  return (
    <AdminLayout>
        <section className="h-full w-full bg-sky-600">
            <h1 className='pt-[50px] text-center text-4xl text-white font-black mb-10'>Teachers</h1>
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
                    teachers?.length ? (
                        <ul className='md:w-2/3 mx-auto max-h-[500px] pr-4 overflow-y-auto'>
                            {
                                teachers.map(teacher => (
                                    <li className='p-2 rounded-full w-full mb-2 text-xl font-bold bg-white'>{teacher.personalData?.firstName} {teacher.personalData?.lastName}</li>      
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

export default Teachers