import Link from "next/link"
import React from "react"
import useAuth from "../../hooks/useAuth"
import { HamburgerMenu } from "../../helpers/icons"

const NavBar = () => {
  const { auth, closeSession } = useAuth()
  const toggleMenu = () => {
    const $ = (arg: string) => document.querySelector(arg)
    const nav = $("#navContainerLinks")
    nav?.classList.toggle("flex")
    nav?.classList.toggle("hidden")
  }
  return (
    <nav id="principalNavBar" className="flex gap-4 items-center px-4">
      {auth?._id ? (
        <div>
          <button
            className="md:hidden flex w-full justify-center items-center py-2"
            type="button"
            onClick={() => toggleMenu()}
          >
            <HamburgerMenu classes={"stroke-white"} />
          </button>
          <div
            id="navContainerLinks"
            className="hidden md:flex flex-col md:flex-row gap-4 items-center px-4"
          >
            <Link
              href={"/profile"}
              className="text-white hover:text-red-100 transition-colors"
            >
              Profile
            </Link>
            {auth?.rank == 1 ? (
              <Link
                href={"/tasks"}
                className="text-white hover:text-red-100 transition-colors"
              >
                Tasks
              </Link>
            ) : auth?.rank == 2 ? (
              <Link
                href={"/tasks/teacher/tasks"}
                className="text-white hover:text-red-100 transition-colors"
              >
                Tasks
              </Link>
            ) : null}
            <Link
              href={"/events"}
              className="text-white hover:text-red-100 transition-colors"
            >
              Events
            </Link>
            <button
              onClick={(e) => closeSession()}
              className="text-white hover:text-red-100 transition-colors bg-red-500 px-2 rounded-md font-bold hover:bg-red-600"
            >
              Close Session
            </button>
            {auth?.rank >= 3 ? (
              <Link
                href={"/admin"}
                className="text-white hover:text-red-100 transition-colors bg-orange-500 px-2 rounded-md font-bold hover:bg-orange-600"
              >
                Administrator
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </nav>
  )
}

export default NavBar
