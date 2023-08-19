import React, { useEffect, useState } from "react"
import AdminLayout from "../../../components/layouts/AdminLayout"
import {
  Careers,
  Semester,
  Subject,
  User,
  addSubjectsParams,
} from "../../../helpers/interfaces"
import useCareer from "../../../hooks/useCareer"
import useSubject from "../../../hooks/useSubject"

const SubjecToSemester = () => {
  const [careerSelected, setCareerSelected] = useState<Careers>({
    _id: "",
    semesters: [],
  })
  const [semesters, setSemesters] = useState<Array<Semester>>([])
  const [semesterSelected, setSemesterSelected] = useState<number>(0)
  const [subjectsList, setSubjectsList] = useState<Array<Subject>>([])
  const { careers } = useCareer()
  const { subjects, addSubjects } = useSubject()

  const handleCareerSelected = (career: string) => {
    const carrerselected =
      careers.filter((caree: Careers) => caree._id == career)[0] ?? {}
    setCareerSelected(carrerselected)
  }
  const handleSubjectSelected = (subject: string) => {
    if (subjectsList.some((subjec) => subjec._id == subject)) return
    if (subject) {
      const subjectselected = subjects.filter(
        (subjec: Subject) => subjec._id == subject,
      )[0]
      setSubjectsList([...subjectsList, subjectselected])
    }
  }
  const handleRemoveSubjectOfList = (subject: string) => {
    if (subject) {
      const newSubjectList = subjectsList.filter(
        (subjec) => subjec._id != subject,
      )
      setSubjectsList(newSubjectList)
    }
  }
  const handleAddSubjects = async (e: any): Promise<void> => {
    e.preventDefault()
    if (semesterSelected == 0) {
      console.error("something is wrong")
      return
    }
    const params: addSubjectsParams = {
      career: careerSelected._id,
      semester: semesterSelected,
      subjectList: subjectsList,
    }
    const data = await addSubjects(params)
    if (data?.msg) {
      alert(data?.msg)
    }
    if (data?.state) {
      setCareerSelected({ _id: "", semesters: [] })
      setSemesterSelected(0)
      setSubjectsList([])
    }
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
            onSubmit={handleAddSubjects}
            className=" mx-4 md:mx-auto md:w-1/2"
          >
            <legend className="text-center text-4xl text-white font-black mb-10">
              add subjects to semester
            </legend>
            <select
              value={String(careerSelected?._id || "")}
              onChange={(e) => handleCareerSelected(String(e.target.value))}
              className="p-2 rounded-full w-full mb-2"
            >
              <option value={""}>Select a career </option>
              {careers?.length
                ? careers.map((career: Careers) => (
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
                ? semesters.map((semester: Semester) => (
                    <option
                      key={String(semester?._id)}
                      value={semester?.semester}
                    >
                      {semester?.semester}
                    </option>
                  ))
                : null}
            </select>
            <select
              value={""}
              onChange={(e) => handleSubjectSelected(e.target.value)}
              className="p-2 rounded-full w-full mb-2"
            >
              <option value={""}>Select a subject </option>
              {subjects?.length
                ? subjects.map((subject: Subject) => (
                    <option
                      key={String(subject?._id)}
                      value={String(subject?._id)}
                    >
                      {subject?.name}
                    </option>
                  ))
                : null}
            </select>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">
                Subjects to add:
              </label>
              <ul>
                {subjectsList?.length
                  ? subjectsList.map((subject) => (
                      <li
                        key={subject._id}
                        className="p-1 rounded-md bg-gray-400 bg-opacity-50 flex items-center justify-between my-1 gap-2"
                      >
                        <p className="text-white">{subject.name}</p>
                        <button
                          onClick={() =>
                            subject?._id &&
                            handleRemoveSubjectOfList(subject._id)
                          }
                          className="p-2 w-10 h-10 m-0 text-white font-bold flex items-center justify-center rounded-full bg-red-400 hover:bg-red-500 hover:uppercase transition-colors"
                        >
                          x
                        </button>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
            <input
              type="submit"
              value="add subjects"
              className="text-xl font-bold text-white px-4 py-2 text-center bg-red-400 hover:bg-red-500 transition-colors cursor-pointer w-full rounded-full mt-4"
            />
          </form>
        </section>
      </div>
    </AdminLayout>
  )
}

export default SubjecToSemester
