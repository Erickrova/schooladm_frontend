import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../components/layouts/AdminLayout'
import { Careers, Subject, User } from '../../../helpers/interfaces'

const StudentToSemester = () => {
    const [careers,setCareers] = useState<Array<Careers>>([])
    const [careerSelected,setCareerSelected] = useState<Careers>({})
    const [semesters,setSemesters] = useState<Array<object>>([])
    const [semesterSelected,setSemesterSelected] = useState<number>(0)
    const [students,setStudents] = useState<Array<User>>([])
    const [studentsSearch,setStudentsSearch] = useState<Array<User>>([])
    const [studentsList,setStudentsList] = useState<Array<User>>([])
    
    const handleCareerSelected = (career:string)=>{
        const carrerselected = careers.filter(caree => caree._id == career)[0] ?? {}
        setCareerSelected(carrerselected)
    }
    const handleAddStudentToList = (student:string)=>{
        if(!studentsList.some(st=> st._id == student)){
            const studentToAdd = students.find(st => st._id == student)
            if(studentToAdd){
                setStudentsList(prev=>[...prev,studentToAdd])
            }
        }
    }
    const handleRemoveStudentOfList = (student) =>{
        if(student){
            const newStudentList = studentsList.filter(st => st._id !== student)
            if(newStudentList){
                setStudentsList(newStudentList)
            }
        }
    }
    const handleAddStudents = async (e:any):Promise<void> =>{
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
          studentList:studentsList

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
        const data = await fetch("http://localhost:4000/api/career/add-student-to-semester",init).then(res => res.json()).then(data => data)
        if(data?.msg){
          alert(data?.msg)
        }
        if(data?.state){
          setCareerSelected({})
          setSemesterSelected(0)
          setStudentsList([])
        }
      } catch (error) {
        console.error(error)
      }
      
    }
    const handleSearch = (param:string) =>{
        if(param){
            const listS = students.filter(stu => (`${stu.personalData?.firstName} ${stu.personalData?.lastName}`).toLocaleLowerCase().includes(param.toLocaleLowerCase()))

            // Evaluating that listS and studentList are different to avoid unnecessary reassignment
            if(!listS.every(s => studentsSearch.some(ss=> ss?._id == s?._id))||listS.some(s => studentsSearch.some(ss=> ss?._id != s?._id)) || listS.length == 0){
                setStudentsSearch(listS)
                return
            }

        }
        setStudentsSearch([])
    }
    const handleBlurSearch = ()=>{
        setTimeout(()=>{
            setStudentsSearch([])
        },300)
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
          <form onSubmit={handleAddStudents} className=" mx-4 md:mx-auto md:w-1/2">
            <legend className="text-center text-4xl text-white font-black mb-10">add students to semester</legend>
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
                <div className='relative'>
                    <input type="search" onBlur={handleBlurSearch} onFocus={e=> handleSearch(e.target.value)} onChange={e=> handleSearch(e.target.value)} placeholder='search student' className="p-2 rounded-full w-full mb-2" />
                    {
                        studentsSearch.length ?(
                            <ul className='bg-white p-2 rounded-md z-10 max-h-52 overflow-y-auto absolute w-full'>
                            {studentsSearch.map(student =>(
                                <li key={student._id} onClick={()=> student._id && handleAddStudentToList(student._id)} className='cursor-pointer p-1 pl-2 rounded-md bg-green-400  flex items-center justify-between my-1 gap-2'>
                                    <p className='capitalize text-white font-bold'>{student.personalData?.firstName} {student.personalData?.lastName}</p>
                                    <button type='button' title='add to list' className='p-2 w-10 h-10 m-0 text-white font-bold flex items-center justify-center rounded-full bg-green-400 hover:bg-green-500 hover:uppercase transition-colors'>{"->"}</button>
                                </li>        
                                ))}
                            </ul> 
                        ):null
                    }
                </div>
               
            <div className="flex justify-center flex-col">
                <label className="text-xl font-bold text-white">Students to add:</label>
                <ul>
                {studentsList.map(student =>(
                    <li key={student._id} className='p-1 rounded-md bg-gray-400 bg-opacity-50 flex items-center justify-between my-1 gap-2'>
                        <p className='text-white capitalize'>{student.personalData?.firstName} {student.personalData?.lastName}</p>
                        <button onClick={()=>student?._id && handleRemoveStudentOfList(student._id)} className='p-2 w-10 h-10 m-0 text-white font-bold flex items-center justify-center rounded-full bg-red-400 hover:bg-red-500 hover:uppercase transition-colors'>x</button>
                    </li>        
                    ))}
                </ul>
              </div>
              <input type="submit" value="add students" className="text-xl font-bold text-white px-4 py-2 text-center bg-red-400 hover:bg-red-500 transition-colors cursor-pointer w-full rounded-full mt-4" />
          </form>
        </section>
      </div>
    </AdminLayout>   
  )
}

export default StudentToSemester