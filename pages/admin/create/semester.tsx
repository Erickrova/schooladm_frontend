import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { Careers, Subject, User } from '../../../helpers/interfaces'

const CreateSemester = () => {
    const [careers,setCareers] = useState<Array<Careers>>([{}])
    const [students,setStudents] = useState<Array<User>>([{}])
    const [teachers,setTeachers] = useState<Array<User>>([{}])
    const [subjects,setSubjects] = useState<Array<Subject>>([{}])
    const [career,setCareer] = useState<String>("")
    const [teacher,setTeacher] = useState<String>("")
    const [student,setStudent] = useState<String>("")
    const [subject,setSubject] = useState<String>("")
    const [semester,setSemester] = useState<Number>(0)

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
  
    const handleCreateSemester = async (e:any):Promise<void> =>{
      e.preventDefault()
      const token = localStorage.getItem("token")
      if(!token){
        console.error("something is wrong")
        return
      }
      if(!career || !teacher || !student || !subject || !semester){
        console.error("something is wrong")
        return
      }
      const semesterObject :Object = {
        career,
        teacher,
        student,
        subject,
        semester
      }
      try {
        const init:Object = {
          method:"POST",
          headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
          },
          mode: 'cors',
          body:JSON.stringify(semesterObject)
        }
        const data:any = await fetch("http://localhost:4000/api/career/create/semester",init).then((res) => res.json()).then((data:any) => data)
        if(data?.state){
          setSubject("")
          setStudent("")
          setTeacher("")
          setCareer("")
          setSemester(0)
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
          <form onSubmit={handleCreateSemester} className=" mx-4 md:mx-auto md:w-1/2">
            <legend className="text-center text-4xl text-white font-black mb-10">Create a semester</legend>
            <select value={String(career)} onChange={e=> setCareer(String(e.target.value))} className="p-2 rounded-full w-full mb-2">
                  <option value={""} disabled>Select a career </option>
                  {careers.map(careerr => (
                    <option key={String(careerr?._id)} value={String(careerr?._id)}>{careerr?.name} </option>
                  ))}
                  
            </select>
            <select value={Number(semester)} onChange={e=> setSemester(Number(e.target.value))} className="p-2 rounded-full w-full mb-2">
                        <option value={0}>Select a semester number </option>
                        {semesterOptions.map(semester =>(
                            <option key={semester.value} value={semester.value}>{semester.opt}</option>
                        ))}
                </select>
                <select value={String(teacher)} onChange={e=> setTeacher(String(e.target.value))} className="p-2 rounded-full w-full mb-2">
                        <option value={0}>Select a teacher </option>
                        {teachers.map(tch =>(
                            <option key={String(tch?._id)} value={String(tch?._id)}>{tch?.personalData?.firstName} {tch?.personalData?.lastName}</option>
                        ))}
                </select>
                <select value={String(student)} onChange={e=> setStudent(String(e.target.value))} className="p-2 rounded-full w-full mb-2">
                        <option value={0}>Select a student </option>
                        {students.map(tch =>(
                            <option key={String(tch?._id)} value={String(tch?._id)}>{tch?.personalData?.firstName} {tch?.personalData?.lastName}</option>
                        ))}
                </select>
                <select value={String(subject)} onChange={e=> setSubject(String(e.target.value))} className="p-2 rounded-full w-full mb-2">
                        <option value={0}>Select a subject </option>
                        {subjects.map(sbj =>(
                            <option key={String(sbj?._id)} value={String(sbj?._id)}>{sbj?.name}</option>
                        ))}
                </select>
                <div className="flex justify-center flex-col">
                    <label className="text-xl font-bold text-white">Planning</label>
                    <input type="file" />
              </div>
              <input type="submit" value="Create Task" className="text-xl font-bold text-white px-4 py-2 text-center bg-red-400 hover:bg-red-500 transition-colors cursor-pointer w-full rounded-full mt-4" />
          </form>
        </section>
      </div>
    </AdminLayout>   
  )
}

export default CreateSemester