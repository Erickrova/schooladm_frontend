import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { Careers, Subject, User } from '../../../helpers/interfaces'

const SubjecToSemester = () => {
    const [careers,setCareers] = useState<Array<Careers>>([])
    const [careerSelected,setCareerSelected] = useState<Careers>({})
    const [semesters,setSemesters] = useState<Array<object>>([])
    const [semesterSelected,setSemesterSelected] = useState<number>(0)
    const [subjects,setSubjects] = useState<Array<Subject>>([])
    const [subjectsList,setSubjectsList] = useState<Array<Subject>>([])
    
    const handleCareerSelected = (career:string)=>{
        const carrerselected = careers.filter(caree => caree._id == career)[0] ?? {}
        setCareerSelected(carrerselected)
    }
    const handleSubjectSelected = (subject:string) =>{
        if(subjectsList.some(subjec => subjec._id == subject)) return
        if(subject){
            const subjectselected = subjects.filter(subjec => subjec._id == subject)[0]
            setSubjectsList([...subjectsList,subjectselected])
        }
    }
    const handleRemoveSubjectOfList = (subject:string)=>{
        if(subject){
            const newSubjectList = subjectsList.filter(subjec => subjec._id != subject)
            setSubjectsList(newSubjectList)
        }
    }
    const handleAddSubjects = async (e:any):Promise<void> =>{
      e.preventDefault()
      const token = localStorage.getItem("token")
      if(!token || semesterSelected == 0){
        console.error("something is wrong")
        return
      }
      try {
        const params = {
          career:careerSelected._id,
          semester:semesterSelected,
          subjectList:subjectsList

        }
        const init:Object = {
          method:"PATCH",
          headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
          },
          mode: 'cors',
          body:JSON.stringify(params)
        }
        const data = await fetch("http://localhost:4000/api/career/add-subject-to-semester",init).then(res => res.json()).then(data => data)
        if(data?.msg){
          alert(data?.msg)
        }
        if(data?.state){
          setCareerSelected({})
          setSemesterSelected(0)
          setSubjectsList([])
        }
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
        fetch("http://localhost:4000/api/subject/get-subjects",init).then(res => res.json()).then(data => setSubjects(data))

      }
      call()
    },[])
    useEffect(()=>{
        if(careerSelected?.semesters){
            setSemesters(careerSelected?.semesters)
        }else{
            setSemesters([])
        }
    },[careerSelected])
  return (
    <AdminLayout>
      <div className="min-h-screen w-full bg-sky-600">
        <section className="w-full pt-[50px] pb-10">
          <form onSubmit={handleAddSubjects} className=" mx-4 md:mx-auto md:w-1/2">
            <legend className="text-center text-4xl text-white font-black mb-10">add subjects to semester</legend>
              <select value={String(careerSelected?._id || "")} onChange={e=> handleCareerSelected(String(e.target.value))} className="p-2 rounded-full w-full mb-2">
                        <option value={""}>Select a career </option>
                        {careers.map(career =>(
                            <option key={String(career?._id)} value={String(career?._id)}>{career?.name}</option>
                        ))}
                </select>
                <select value={semesterSelected || 0} onChange={e=> setSemesterSelected(Number(e.target.value))} className="p-2 rounded-full w-full mb-2">
                        <option value={0}>Select a semester </option>
                        {semesters.map(semester =>(
                            <option key={String(semester?._id)} value={semester?.semester}>{semester?.semester}</option>
                        ))}
                </select>
                <select value={""} onChange={e=> handleSubjectSelected(e.target.value)} className="p-2 rounded-full w-full mb-2">
                        <option value={""}>Select a subject </option>
                        {subjects.map(subject =>(
                            <option key={String(subject?._id)} value={String(subject?._id)}>{subject?.name}</option>
                        ))}
                </select>
            <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">Subjects to add:</label>
                <ul>
                {subjectsList.map(subject =>(
                    <li key={subject._id} className='p-1 rounded-md bg-gray-400 bg-opacity-50 flex items-center justify-between my-1 gap-2'>
                        <p className='text-white'>{subject.name}</p>
                        <button onClick={()=>subject?._id && handleRemoveSubjectOfList(subject._id)} className='p-2 w-10 h-10 m-0 text-white font-bold flex items-center justify-center rounded-full bg-red-400 hover:bg-red-500 hover:uppercase transition-colors'>x</button>
                    </li>        
                    ))}
                </ul>
              </div>
              <input type="submit" value="add subjects" className="text-xl font-bold text-white px-4 py-2 text-center bg-red-400 hover:bg-red-500 transition-colors cursor-pointer w-full rounded-full mt-4" />
          </form>
        </section>
      </div>
    </AdminLayout>   
  )
}

export default SubjecToSemester