import { useEffect, useState } from 'react'
import ProfileLayout from '../../components/layouts/ProfileLayout'
import useAuth from '../../hooks/useAuth'
import QualificationCard from '../../components/QualificationCard'

const Qualifications = () => {
  const {profile,auth} = useAuth()
  const {personalData} = profile

  const [userSemesters,setUserSemesters] = useState()
  const [semesterSelected,setSemesterSelected] = useState()
  const [subjects,setSubjects] = useState()
  const [subjectSelected,setSubjectSelected] = useState()
  const [qualifications,setQualifications] = useState()
  useEffect(()=>{
    if(personalData){
      const semestersUser = personalData?.career?.semesters.filter(semester => semester.students.some(student => student._id == profile._id))
      setUserSemesters(semestersUser)
    }
  },[personalData])
  useEffect(()=>{
    if(semesterSelected){
      const smu = personalData?.career?.semesters.filter(semester => semester.semester == semesterSelected)
      const subjectss = smu[0].subjects
      if(subjectss.length){
        setSubjects(subjectss)
      }else{
        setSubjects([])
      }
    }else{
      setSubjects([])
    }
  },[semesterSelected]) 
  useEffect(()=>{
     const call = async () =>{
      const token = localStorage.getItem("token")
      if(!token){
        console.log("something wrong")
        return
      }
      if(!auth?._id){
        console.log("something wrong")
        return
      }
      if(!subjectSelected || !semesterSelected){
        setQualifications([])
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
      fetch(`http://localhost:4000/api/user/get-qualifications/${semesterSelected}/${subjectSelected}/${profile._id}`,init).then(res => res.json()).then(data => setQualifications(data))
    }
    call()
  },[subjectSelected,semesterSelected])
  return (
    <ProfileLayout>
      <div>
          <h1 className="text-center text-4xl text-white font-black my-5">Qualifications</h1>
        <form className=" mx-4 md:mx-auto md:w-1/2 pb-5 ">
          <div className="flex justify-center flex-col gap-4 md:flex-row">
          <select value={semesterSelected} onChange={e=> setSemesterSelected(e.target.value)} className="p-2 rounded-full w-full">
                <option value="">Select a semester </option>
                {
                  userSemesters?.length ? userSemesters.map(semester=>
                    (
                    <option key={semester._id} value={semester.semester}>{semester.semester} </option>
                  )):null
                }
            </select>
            <select value={subjectSelected} onChange={e => setSubjectSelected(e.target.value)} className="p-2 rounded-full w-full">
                <option value="">Select a subject </option>
                {
                  subjects?.length ? subjects?.map(subject=>
                    (
                    <option key={subject._id} value={subject._id}>{subject.name} </option>
                  )):null
                }
            </select>
            
          </div>
          <div>
            {
                qualifications?.length ? (
                    <ul className='md:w-2/3 mx-auto px-4'>
                        {
                          qualifications.map((q:any) => (
                            <QualificationCard key={q.studentTask._id} data={q.task} task={q.studentTask} />
                            ))
                        }
                    </ul>
                ):(
                    <p className='pt-[50px] text-center text-4xl text-white font-black mb-10'>no items</p>
                )
            }
        </div>
        </form>
      </div>
    </ProfileLayout>
  )
}

export default Qualifications