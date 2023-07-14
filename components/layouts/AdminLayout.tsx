import React, { useEffect } from 'react'
import Layout from './Layout'
import Link from 'next/link'
import useAuth from '../../hooks/useAuth'
import BackRoute from './BackRoute'

const AdminLayout = ({children}:any) => {
    const {profile,auth,loading} = useAuth()
    const {personalData} = profile
  return (
    auth?._id && !loading ?  (

        <Layout>
          <section className='pt-10 w-full flex flex-col md:flex-row h-screen overflow-hidden'>
              <nav className='pt-10 bg-gray-700 md:w-1/6 px-2 flex flex-col h-screen overflow-hidden'>
                  <h2 className=' font-bold text-xl text-white hover:text-gray-300 transition-colors capitalize '>Hello - {personalData?.firstName}</h2>
                  <h2 className=' font-bold text-lg text-white hover:text-gray-300 transition-colors capitalize '>View</h2>
                  <Link href={"/admin/view/students"} className=' text-sm py-1 text-white hover:text-gray-300 transition-colors capitalize '>view students</Link>
                  <Link href={"/admin/view/teachers"} className=' text-sm py-1 text-white hover:text-gray-300 transition-colors capitalize '>view teachers</Link>
                  <Link href={"/admin/view/administrators"} className=' text-sm py-1 text-white hover:text-gray-300 transition-colors capitalize '>view administrators</Link>
                  <Link href={"/admin/view/tasks"} className=' text-sm py-1 text-white hover:text-gray-300 transition-colors capitalize '>view tasks</Link>
                  <Link href={"/admin/view/events"} className=' text-sm py-1 text-white hover:text-gray-300 transition-colors capitalize '>view events</Link>
                  <h2 className=' font-bold text-lg text-white hover:text-gray-300 transition-colors capitalize '>create</h2>
                  <Link href={"/admin/create/user"} className=' text-sm py-1 text-white hover:text-gray-300 transition-colors capitalize '>create user</Link>
                  <Link href={"/admin/create/task"} className=' text-sm py-1 text-white hover:text-gray-300 transition-colors capitalize '>create tasks</Link>
                  <Link href={"/admin/create/event"} className=' text-sm py-1 text-white hover:text-gray-300 transition-colors capitalize '>create events</Link>
                  <Link href={"/admin/create/subject"} className=' text-sm py-1 text-white hover:text-gray-300 transition-colors capitalize '>create subjects</Link>
                  <Link href={"/admin/create/career"} className=' text-sm py-1 text-white hover:text-gray-300 transition-colors capitalize '>create careers</Link>
                  <Link href={"/admin/create/semester"} className=' text-sm py-1 text-white hover:text-gray-300 transition-colors capitalize '>create semesters</Link>
                  <h2 className=' font-bold text-lg text-white hover:text-gray-300 transition-colors capitalize '>add</h2>
                  <h2 className=' font-bold text-lg text-white hover:text-gray-300 transition-colors capitalize '>update</h2>
                  <h2 className=' font-bold text-lg text-white hover:text-gray-300 transition-colors capitalize '>delete</h2>
                  <Link href={"/admin/delete/events"} className=' text-sm py-1 text-white hover:text-gray-300 transition-colors capitalize '>delete event</Link>
              </nav>
              <div className='md:w-5/6 h-screen overflow-y-scroll'>
                  {children}
              </div>
          </section>
    </Layout>
  ): !loading ?(
    <BackRoute/>
  ):null
  )
}

export default AdminLayout