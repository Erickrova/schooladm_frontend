import { createContext, useEffect, useState } from "react"
import {
  Careers,
  ChildrenProps,
  User,
  addStudentsParams,
} from "../helpers/interfaces"
import useAuth from "../hooks/useAuth"

const UserContext = createContext<null | any>(null)

const UserProvider = ({ children }: ChildrenProps) => {
  const [students, setStudents] = useState<Array<User>>([])
  const [teachers, setTeachers] = useState<Array<User>>([])
  const [administrators, setAdministrators] = useState<Array<User>>([])
  const { auth } = useAuth()

  //** GET functions
  const getStudents = async (): Promise<Array<User>> => {
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
      const data: Array<User> = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/get-students`,
        init,
      )
        .then((res) => res.json())
        .then((data) => data)
      return data
    } catch (error) {
      throw new Error("something wrong")
    }
  }
  const getTeachers = async (): Promise<Array<User>> => {
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
      const data: Array<User> = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/get-teachers`,
        init,
      )
        .then((res) => res.json())
        .then((data) => data)
      return data
    } catch (error) {
      throw new Error("something wrong")
    }
  }
  const getAdministrators = async (): Promise<Array<User>> => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("something wrong")
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/get-adms`,
        init,
      )
        .then((res) => res.json())
        .then((data) => data)
      return data
    } catch (error) {
      throw new Error("something wrong")
    }
  }
  const getQualifications = async (
    semesterSelected: number,
    subjectSelected: string,
    userId: string,
  ): Promise<Array<Object>> => {
    const token = localStorage.getItem("token")
    if (!token || !semesterSelected || !subjectSelected || !userId)
      throw new Error("something wrong")
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/get-qualifications/${semesterSelected}/${subjectSelected}/${userId}`,
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
  const registerUser = async (userObject: Object): Promise<Object> => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("something wrong")

    try {
      const init: Object = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        mode: "cors",
        body: JSON.stringify(userObject),
      }
      const data: any = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/register`,
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
   * @typedef {Object} addStudentsParams
   * @property {String} career career selected id
   * @property {Number} semester semester selected
   * @property {Array<Subject>} subjectList
   */
  /**
   *
   * @param {addStudentsParams} params
   * @returns
   */
  const addStudents = async (params: addStudentsParams): Promise<Object> => {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("something wrong")
    }
    try {
      const init: Object = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify(params),
      }
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/career/add-student-to-semester`,
        init,
      )
        .then((res) => res.json())
        .then((data) => data)
      return data
    } catch {
      throw new Error("something wrong")
    }
  }

  //** DELETE functions
  const deleteUser = async (id: string): Promise<Object> => {
    const token = localStorage.getItem("token")
    if (!token || !id) throw new Error("something wrong")
    const init = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/delete/${id}`,
        init,
      )
        .then((res) => res.json())
        .then((data) => data)
      return data
    } catch (error) {
      throw new Error("something wrong")
    }
  }

  //** UseEFFECTS

  useEffect(() => {
    const call = async () => {
      let data: Array<User> = await getStudents()
      setStudents(data)
      data = await getTeachers()
      setTeachers(data)
      data = await getAdministrators()
      setAdministrators(data)
    }
    if (auth._id) {
      call()
    }
  }, [auth])
  return (
    <UserContext.Provider
      value={{
        students,
        setStudents,
        addStudents,
        teachers,
        setTeachers,
        registerUser,
        administrators,
        setAdministrators,
        deleteUser,
        getQualifications,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext }

export default UserProvider
