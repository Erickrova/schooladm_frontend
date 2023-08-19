import { HamburgerMenu } from "../../helpers/icons"
import AdminLink from "../Links/AdminLink"

const AdminLateralNavBar = ({ personalData }: any): JSX.Element => {
  const toggleMenu = () => {
    const $ = (arg: string) => document.querySelector(arg)
    const nav = $("#linksContainer")
    nav?.classList.toggle("scale-y-100")
    nav?.classList.toggle("scale-y-0")
  }
  return (
    <nav
      id="adminLateralNavBar"
      className="pt-6 md:pt-10 md:bg-gray-700 md:w-1/6
      fixed top-16 md:static w-full md:z-10 md:overflow-y-auto
      "
    >
      <button
        className="md:hidden flex bg-gray-700 w-full justify-center items-center py-2"
        type="button"
        onClick={() => toggleMenu()}
      >
        <HamburgerMenu classes={"stroke-white"} />
      </button>
      <div
        id="linksContainer"
        className="flex flex-col md:h-screen md:max-h-screen scale-y-0 transition-all origin-top bg-gray-700 px-2 md:scale-y-100 h-96 overflow-y-scroll md:overflow-y-visible"
      >
        <h2 className=" font-bold text-xl text-white hover:text-gray-300 transition-colors capitalize ">
          Hello - {personalData?.firstName}
        </h2>
        <h2 className=" font-bold text-lg text-white hover:text-gray-300 transition-colors capitalize ">
          View
        </h2>
        <AdminLink href={"/admin/view/students"} text={"view students"} />
        <AdminLink href={"/admin/view/teachers"} text={"view teachers"} />
        <AdminLink
          href={"/admin/view/administrators"}
          text={"view administrators"}
        />
        <AdminLink href={"/admin/view/tasks"} text={"view tasks"} />
        <AdminLink href={"/admin/view/events"} text={"view events"} />
        <h2 className=" font-bold text-lg text-white hover:text-gray-300 transition-colors capitalize ">
          create
        </h2>
        <AdminLink href={"/admin/create/user"} text={"create user"} />
        <AdminLink href={"/admin/create/task"} text={"create task"} />
        <AdminLink href={"/admin/create/event"} text={"create event"} />
        <AdminLink href={"/admin/create/subject"} text={"create subject"} />
        <AdminLink href={"/admin/create/career"} text={"create career"} />
        <AdminLink href={"/admin/create/semester"} text={"create semesters"} />
        <h2 className=" font-bold text-lg text-white hover:text-gray-300 transition-colors capitalize ">
          add
        </h2>
        <AdminLink
          href={"/admin/add/subject-to-semester"}
          text={"add subject to semester"}
        />
        <AdminLink
          href={"/admin/add/student-to-semester"}
          text={"add student to semester"}
        />
        <h2 className=" font-bold text-lg text-white hover:text-gray-300 transition-colors capitalize ">
          update
        </h2>
      </div>
    </nav>
  )
}

export default AdminLateralNavBar
