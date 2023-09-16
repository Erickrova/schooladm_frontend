import { createContext, useEffect, useState } from "react"
import {
  ChildrenProps,
  Subject,
  addSubjectsParams,
} from "../helpers/interfaces"
import useAuth from "../hooks/useAuth"

const SubjectContext = createContext<null | any>(null)

const SubjectProvider = ({ children }: ChildrenProps) => {
  const [subjects, setSubjects] = useState<Array<Subject>>()
  const { auth } = useAuth()

  //** GET functions
  const getSubjects = async (): Promise<Array<Subject>> => {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("something wrong")
    }
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const data: Array<Subject> = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subject/get-subjects`,
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

  const createSubject = async (subjectObject: Object): Promise<Object> => {
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
        body: JSON.stringify(subjectObject),
      }
      const data: any = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subject/create`,

        init,
      )
        .then((res) => res.json())
        .then((data: any) => data)
      return data
    } catch (error) {
      throw new Error("something wrong")
    }
  }

  //** PATCH functions
  /**
   * @typedef {Object} addSubjectsParams
   * @property {String} career career selected id
   * @property {Number} semester semester selected
   * @property {Array<Subject>} subjectList
   */
  /**
   *
   * @param {addSubjectsParams} params
   * @returns
   */
  const addSubjects = async (params: addSubjectsParams): Promise<Object> => {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("something wrong")
    }
    const init: Object = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      body: JSON.stringify(params),
    }
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/career/add-subject-to-semester`,
        init,
      )
        .then((res) => res.json())
        .then((data) => data)
      return data
    } catch (error) {
      throw new Error("something wrong")
    }
  }

  useEffect(() => {
    const call = async () => {
      const data: Array<Subject> = await getSubjects()
      setSubjects(data)
    }
    if (auth._id) {
      call()
    }
  }, [auth])
  return (
    <SubjectContext.Provider
      value={{
        subjects,
        setSubjects,
        addSubjects,
        createSubject,
      }}
    >
      {children}
    </SubjectContext.Provider>
  )
}

export { SubjectContext }

export default SubjectProvider
