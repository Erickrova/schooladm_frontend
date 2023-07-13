import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { User } from '../../../helpers/interfaces'

const CreateSubject = () => {

    const [teachers,setTeachers] = useState<Array<User>>([{}])
    const [teacher,setTeacher] = useState<String>("")
    const [name,setName] = useState<String>("")
    const [description,setDescription] = useState<String>("")

  
    const handleCreateSubject = async (e:any):Promise<void> =>{
      e.preventDefault()
      const token = localStorage.getItem("token")
      if(!teacher || !name){
        console.error("something is wrong")
        return
      }
      if(!token){
        console.error("something is wrong")
        return
      }
      try {
        const init:Object = {
          method:"POST",
          headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
          },
          mode: 'cors',
          body:JSON.stringify({teacher,name,description})
        }
        const data:any = await fetch("http://localhost:4000/api/subject/create",init).then((res) => res.json()).then((data:any) => data)
        if(data?.state){
          setTeacher("")
          setName("")
          setDescription("")
        }
        alert(data?.msg)
      } catch (error) {
        console.error(error)
      }
      
    }
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
        fetch("http://localhost:4000/api/user/get-teachers",init).then(res => res.json()).then(data => setTeachers(data))
      }
      call()
    },[])
  return (
    <AdminLayout>
      <div className="min-h-screen w-full bg-sky-600">
        <section className="w-full pt-[50px] pb-10">
          <form onSubmit={handleCreateSubject} className=" mx-4 md:mx-auto md:w-1/2">
            <legend className="text-center text-4xl text-white font-black mb-10">Create a subject</legend>
              <select value={String(teacher)} onChange={e=> setTeacher(String(e.target.value))} className="p-2 rounded-full w-full mb-2">
                        <option value={0}>Select a teacher </option>
                        {teachers.map(tch =>(
                            <option key={String(tch?._id)} value={String(tch?._id)}>{tch?.personalData?.firstName} {tch?.personalData?.lastName}</option>
                        ))}
                </select>
            <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">Name</label>
                <input type="text" value={String(name)} onChange={e => setName(String(e.target.value))} className="p-2 rounded-full" placeholder="Student name" />
              </div>
              <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">Description</label>
                <textarea value={String(description)} onChange={e => setDescription(String(e.target.value))} className='w-full h-32 rounded-md'></textarea>
              </div>
              <input type="submit" value="Create Task" className="text-xl font-bold text-white px-4 py-2 text-center bg-red-400 hover:bg-red-500 transition-colors cursor-pointer w-full rounded-full mt-4" />
          </form>
        </section>
      </div>
    </AdminLayout>   
  )
}

export default CreateSubject