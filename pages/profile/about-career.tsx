import { profileEnd } from 'console'
import ProfileLayout from '../../components/layouts/ProfileLayout'
import useAuth from '../../hooks/useAuth'
import { useEffect, useState } from 'react'

const AboutCareer = () => {
  const [semesters,setSemesters] = useState<Array<object>>([])
  const {profile} = useAuth()
  const {personalData} = profile
  console.log(profile)
  useEffect(()=>{
    const call = async () =>{
      const token = localStorage.getItem("token")
      if(!token || !profile?.personalData?.career){
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
      const data:Array<object> = await fetch(`http://localhost:4000/api/career/get-subjects-semesters/${profile.personalData.career._id}`,init).then(res => res.json()).then(data => data)
      const semestersSort = data.sort((a,b)=> a.semester > b.semester ? 1 : -1)
      setSemesters(semestersSort)
   }
    call()
  },[profile])
  return (
    <ProfileLayout>
      <div>
          <h1 className="text-center text-4xl text-white font-black mt-5">About Career</h1>
          <div className='md:w-2/3 md:mx-auto md:flex md:flex-col md:justify-center'>
          <h2 className="text-center text-3xl text-white font-black my-5">{personalData?.career?.name}</h2>
              <p className='mb-2 text-white whitespace-pre-wrap0'>{personalData?.career?.description}</p>
          </div>
          <div className='pb-4'>
          <h2 className="text-center text-3xl text-white font-black my-5">Semesters' Subjects</h2>

          <table className='md:w-2/3 md:mx-auto w-full mb-2'>
              {
               semesters.length ? semesters.map ( semester=>(
                <>
                    <tr className='border border-collapse border-black'>
                      <th className='text-black text-center p-2 border border-black  bg-gray-400'>semester</th>
                      <th className='text-black text-center p-2 border border-black bg-gray-400'>subjects</th>
                    </tr>
                    {
                      semester.subjects.map(subject =>(
                        <tr className='border border-collapse border-black'>
                          <td className='text-black bg-gray-100 text-center font-bold p-2 border border-black'>{semester.semester}</td>
                          <td className='text-black bg-gray-100 text-center p-2 border border-black'>{subject.name}</td>
                        </tr>
                      ))
                    }
                    </>
                )
               ):null 
              }
                  </table>
          </div>
      </div>
    </ProfileLayout>
  )
}

export default AboutCareer