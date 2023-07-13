import Link from 'next/link'
import React from 'react'
import useAuth from '../../hooks/useAuth'

const NavBar = () => {
    const {auth,closeSession} = useAuth()
  return (
    <nav className='flex gap-4 items-center px-4'>
      {auth?._id ? (
        <>
          <Link href={"/profile"} className="text-white hover:text-red-100 transition-colors">Profile</Link>
          {auth?.rank == 1 ?(
            <Link href={"/tasks"} className="text-white hover:text-red-100 transition-colors">Tasks</Link>
            ):auth?.rank == 2 ? (
            <Link href={"/tasks/teacher/tasks"} className="text-white hover:text-red-100 transition-colors">Tasks</Link>
          ):null}
          <Link href={"/events"} className="text-white hover:text-red-100 transition-colors">Events</Link>
          <button onClick={e => closeSession()} className="text-white hover:text-red-100 transition-colors bg-red-500 px-2 rounded-md font-bold hover:bg-red-600" >Close Session</button>
          {
            auth?.rank >= 3 ? (
              <Link href={"/admin"} className="text-white hover:text-red-100 transition-colors bg-orange-500 px-2 rounded-md font-bold hover:bg-orange-600">Administrator</Link>
            ):<></>
          }
        </>
      ):(
          <>
          </>
        )}
    </nav>
  )
}

export default NavBar