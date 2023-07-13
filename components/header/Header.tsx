import React from 'react'
import NavBar from './NavBar'

const Header = () => {
  return (
    <header className='fixed top-0 w-full z-50 bg-sky-600'>
        <div className='flex justify-between items-center py-2'>
          <div className='flex items-center px-4'>
            <p className='text-2xl font-bold text-white'>SchoolLogo
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-red-400 fill-red-400">
  <path fillRule="evenodd" d="M11.484 2.17a.75.75 0 011.032 0 11.209 11.209 0 007.877 3.08.75.75 0 01.722.515 12.74 12.74 0 01.635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 01-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 01.722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 15a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12z" clipRule="evenodd" />
</svg>

          </div>
            <NavBar/>
        </div>
    </header>
  )
}

export default Header