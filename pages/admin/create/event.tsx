import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { useRouter } from 'next/router'
import { Careers } from '../../../helpers/interfaces'
import { User } from '../../../helpers/interfaces'
import { Subject } from '../../../helpers/interfaces'

const CreateEvent = () => {

    const [careers,setCareers] = useState<Array<Careers>>([{}])
    const [students,setStudents] = useState([{}])
    const [teachers,setTeachers] = useState<Array<User>>([{}])
    const [subjects,setSubjects] = useState<Array<Subject>>([{}])

    
    const [eventCreator,setEventCreator] = useState<User>()
    const [guests,setGuests] = useState<String>("")
    const [subject,setSubject] = useState<String>("")
    const [semester,setSemester] = useState<Number>(0)
    const [title,setTitle] = useState<String>("")
    const [description,setDescription] = useState<String>("")
    const [initialDate,setInitialDate] = useState<String>("")
    const [finalDate,setFinalDate] = useState<String>("")


    const semesterOptions = [
      {
          value:1,
          opt:"1"
      },
      {
          value:2,
          opt:"2"
      },
      {
          value:3,
          opt:"3"
      },
      {
          value:4,
          opt:"4"
      },
      {
          value:5,
          opt:"5"
      },
      {
          value:6,
          opt:"6"
      },
      {
          value:7,
          opt:"7"
      },
      {
          value:8,
          opt:"8"
      },
      {
          value:9,
          opt:"9"
      },
      {
          value:10,
          opt:"10"
      },
      {
          value:11,
          opt:"11"
      },
      {
          value:12,
          opt:"12"
      }
  ]
  
    const handleRegisterUser = async (e:any):Promise<void> =>{
      e.preventDefault()
      const token = localStorage.getItem("token")
      if(!guests || !subject || !semester || !title || !description || !initialDate || !finalDate){
        console.error("something is wrong")
        return
      }
      if(!token){
        console.log("!something wrong")
        return
      }
      const eventData:Object = {
        guests,
        eventCreator,
        subject,
        semester,
        title,
        description,
        initialDate,
        finalDate
      }
      console.log(eventData)
      try {
        const init:Object = {
          method:"POST",
          headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
          },
          mode: 'cors',
          body:JSON.stringify(eventData)
        }
        const data:any = await fetch("http://localhost:4000/api/event/create",init).then((res) => res.json()).then((data:any) => data)
        if(data?.state){
          setGuests("")
          setEventCreator("")
          setSubject("")
          setSemester(0)
          setTitle("")
          setDescription("")
          setInitialDate("")
          setFinalDate("")
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
        fetch("http://localhost:4000/api/career/get-careers",init).then(res => res.json()).then(data => setCareers(data))
        fetch("http://localhost:4000/api/user/get-students",init).then(res => res.json()).then(data => setStudents(data))
        fetch("http://localhost:4000/api/user/get-teachers",init).then(res => res.json()).then(data => setTeachers(data))
        fetch("http://localhost:4000/api/subject/get-subjects",init).then(res => res.json()).then(data => setSubjects(data))
      }
      call()

    },[])
  return (
    <AdminLayout>
      <div className="min-h-screen w-full bg-sky-600">
        <section className="w-full pt-[50px] pb-10">
          <form onSubmit={handleRegisterUser} className=" mx-4 md:mx-auto md:w-1/2">
            <legend className="text-center text-4xl text-white font-black mb-10">Create an event</legend>
            <select value={String(guests)} onChange={e=> setGuests(String(e.target.value))} className="p-2 rounded-full w-full mb-2">
                  <option value={""} disabled>Select a guests </option>
                  {careers.map(careerr => (
                    <option key={String(careerr?._id)} value={String(careerr?._id)}>{careerr?.name} </option>
                  ))}
                </select>
                <select value={String(eventCreator)} onChange={e=> setEventCreator(String(e.target.value))} className="p-2 rounded-full w-full mb-2">
                        <option value={""}>Select event creator </option>
                        {teachers.map(tch =>(
                            <option key={String(tch?._id)} value={String(tch?._id)}>{tch?.personalData?.firstName} {tch?.personalData?.lastName}</option>
                        ))}
                </select>
            <div className='flex gap-2 flex-col md:flex-row'>
            <select value={String(subject)} onChange={e=> setSubject(String(e.target.value))} className="p-2 rounded-full w-full mb-2">
                        <option value={0}>Select a subject </option>
                        {subjects.map(sbj =>(
                            <option key={String(sbj?._id)} value={String(sbj?._id)}>{sbj?.name}</option>
                        ))}
                </select>
                <select value={Number(semester)} onChange={e=> setSemester(Number(e.target.value))} className="p-2 rounded-full w-full mb-2">
                        <option value={0}>Select a semester number </option>
                        {semesterOptions.map(semester =>(
                            <option key={semester.value} value={semester.value}>{semester.opt}</option>
                        ))}
                </select>
            </div>
            <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">Title</label>
                <input type="text" value={String(title)} onChange={e => setTitle(String(e.target.value))} className="p-2 rounded-full" placeholder="Student name" />
              </div>
              <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">Description</label>
                <textarea name="" value={String(description)} onChange={e => setDescription(String(e.target.value))} id="" className='w-full h-32 rounded-md'></textarea>
              </div>
              <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">files</label>
                <input type="file"  />
              </div>
              <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">initial date</label>
                <input type="date" value={String(initialDate)} onChange={e => setInitialDate(String(e.target.value))} />
              </div>
              <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">final date</label>
                <input type="date" value={String(finalDate)} onChange={e => setFinalDate(String(e.target.value))} />
              </div>
              <input type="submit" value="Create Task" className="text-xl font-bold text-white px-4 py-2 text-center bg-red-400 hover:bg-red-500 transition-colors cursor-pointer w-full rounded-full mt-4" />
          </form>
        </section>
      </div>
    </AdminLayout>   
  )
}

export default CreateEvent