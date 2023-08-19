import React, { useEffect, useState } from "react"
import AdminLayout from "../../../components/layouts/AdminLayout"
import {
  Careers,
  Semester,
  Subject,
  User,
  addStudentsParams,
} from "../../../helpers/interfaces"
import useCareer from "../../../hooks/useCareer"
import useUser from "../../../hooks/useUser"

const StudentToSemester = () => {
  const [careerSelected, setCareerSelected] = useState<Careers>({
    _id: "",
    semesters: [],
  })
  const [semesters, setSemesters] = useState<Array<Semester>>([])
  const [semesterSelected, setSemesterSelected] = useState<number>(0)
  const [studentsSearch, setStudentsSearch] = useState<Array<User>>([])
  const [studentsList, setStudentsList] = useState<Array<User>>([])
  const { careers } = useCareer()
  const { students, addStudents } = useUser()

  const handleCareerSelected = (career: string) => {
    const carrerselected =
      careers.filter((caree: Careers) => caree._id == career)[0] ?? {}
    setCareerSelected(carrerselected)
  }
  const handleAddStudentToList = (student: string) => {
    if (!studentsList.some((st) => st._id == student)) {
      const studentToAdd = students.find((st: User) => st._id == student)
      if (studentToAdd) {
        setStudentsList((prev) => [...prev, studentToAdd])
      }
    }
  }
  const handleRemoveStudentOfList = (student: string) => {
    if (student) {
      const newStudentList = studentsList.filter((st) => st._id !== student)
      if (newStudentList) {
        setStudentsList(newStudentList)
      }
    }
  }
  const handleAddStudents = async (e: any): Promise<void> => {
    e.preventDefault()
    if (semesterSelected == 0) {
      console.error("something is wrong")
      return
    }
    const params: addStudentsParams = {
      career: careerSelected._id,
      semester: semesterSelected,
      studentList: studentsList,
    }
    const data = await addStudents(params)
    if (data?.msg) {
      alert(data?.msg)
    }
    if (data?.state) {
      setCareerSelected({ _id: "", semesters: [] })
      setSemesterSelected(0)
      setStudentsList([])
    }
  }
  const handleSearch = (param: string) => {
    if (param) {
      const listS = students.filter((stu: User) =>
        `${stu.personalData?.firstName} ${stu.personalData?.lastName}`
          .toLocaleLowerCase()
          .includes(param.toLocaleLowerCase()),
      )
      // Evaluating that listS and studentList are different to avoid unnecessary reassignment
      if (
        !listS.every((s: User) =>
          studentsSearch.some((ss) => ss?._id == s?._id),
        ) ||
        listS.some((s: User) =>
          studentsSearch.some((ss) => ss?._id != s?._id),
        ) ||
        listS.length == 0
      ) {
        setStudentsSearch(listS)
        return
      }
    }
    setStudentsSearch([])
  }
  const handleBlurSearch = () => {
    setTimeout(() => {
      setStudentsSearch([])
    }, 300)
  }
  useEffect(() => {
    if (careerSelected?.semesters) {
      setSemesters(careerSelected?.semesters)
    } else {
      setSemesters([])
    }
  }, [careerSelected])

  return (
    <AdminLayout>
      <div className="min-h-screen w-full bg-sky-600">
        <section className="w-full pt-[50px] pb-10">
          <form
            onSubmit={handleAddStudents}
            className=" mx-4 md:mx-auto md:w-1/2"
          >
            <legend className="text-center text-4xl text-white font-black mb-10">
              add students to semester
            </legend>
            <select
              value={String(careerSelected?._id || "")}
              onChange={(e) => handleCareerSelected(String(e.target.value))}
              className="p-2 rounded-full w-full mb-2"
            >
              <option value={""}>Select a career </option>
              {careers?.length
                ? careers?.map((career: Careers) => (
                    <option
                      key={String(career?._id)}
                      value={String(career?._id)}
                    >
                      {career?.name}
                    </option>
                  ))
                : null}
            </select>
            <select
              value={semesterSelected || 0}
              onChange={(e) => setSemesterSelected(Number(e.target.value))}
              className="p-2 rounded-full w-full mb-2"
            >
              <option value={0}>Select a semester </option>
              {semesters?.length
                ? semesters?.map((semester) => (
                    <option
                      key={String(semester?._id)}
                      value={semester?.semester}
                    >
                      {semester?.semester}
                    </option>
                  ))
                : null}
            </select>
            <div className="relative">
              <input
                type="search"
                onBlur={handleBlurSearch}
                onFocus={(e) => handleSearch(e.target.value)}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="search student"
                className="p-2 rounded-full w-full mb-2"
              />
              {studentsSearch.length ? (
                <ul className="bg-white p-2 rounded-md z-10 max-h-52 overflow-y-auto absolute w-full">
                  {studentsSearch.map((student) => (
                    <li
                      key={student._id}
                      onClick={() =>
                        student._id && handleAddStudentToList(student._id)
                      }
                      className="cursor-pointer p-1 pl-2 rounded-md bg-green-400  flex items-center justify-between my-1 gap-2"
                    >
                      <p className="capitalize text-white font-bold">
                        {student.personalData?.firstName}{" "}
                        {student.personalData?.lastName}
                      </p>
                      <button
                        type="button"
                        title="add to list"
                        className="p-2 w-10 h-10 m-0 text-white font-bold flex items-center justify-center rounded-full bg-green-400 hover:bg-green-500 hover:uppercase transition-colors"
                      >
                        {"->"}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">
                Students to add:
              </label>
              <ul>
                {studentsList.map((student) => (
                  <li
                    key={student._id}
                    className="p-1 rounded-md bg-gray-400 bg-opacity-50 flex items-center justify-between my-1 gap-2"
                  >
                    <p className="text-white capitalize">
                      {student.personalData?.firstName}{" "}
                      {student.personalData?.lastName}
                    </p>
                    <button
                      onClick={() =>
                        student?._id && handleRemoveStudentOfList(student._id)
                      }
                      className="p-2 w-10 h-10 m-0 text-white font-bold flex items-center justify-center rounded-full bg-red-400 hover:bg-red-500 hover:uppercase transition-colors"
                    >
                      x
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <input
              type="submit"
              value="add students"
              className="text-xl font-bold text-white px-4 py-2 text-center bg-red-400 hover:bg-red-500 transition-colors cursor-pointer w-full rounded-full mt-4"
            />
          </form>
        </section>
      </div>
    </AdminLayout>
  )
}

export default StudentToSemester
