import { createContext } from "react"
import { ChildrenProps, Semester } from "../helpers/interfaces"

const SemesterContext = createContext<null | any>(null)

const SemesterProvider = ({ children }: ChildrenProps) => {
  //** GET funcions
  const getSemestersSubjects = async (
    careerId: string,
  ): Promise<Array<Semester>> => {
    const token = localStorage.getItem("token")
    if (!token || !careerId) throw new Error("something wrong")
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const data: Array<Semester> = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/career/get-subjects-semesters/${careerId}`,
        init,
      )
        .then((res) => res.json())
        .then((data) => data)
      return data
    } catch (error) {
      throw new Error("something wrong")
    }
  }
  //** POST functions
  const createSemester = async (semesterObject: Object): Promise<Object> => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("something wrong")

    try {
      const init: Object = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify(semesterObject),
      }
      const data: any = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/career/create/semester`,

        init,
      )
        .then((res) => res.json())
        .then((data: any) => data)
      return data
    } catch (error) {
      throw new Error("something wrong")
    }
  }

  return (
    <SemesterContext.Provider
      value={{
        createSemester,
        getSemestersSubjects,
      }}
    >
      {children}
    </SemesterContext.Provider>
  )
}
export { SemesterContext }
export default SemesterProvider
