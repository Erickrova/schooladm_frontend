import React, { useEffect, useState } from "react"
import AdminLayout from "../../../components/layouts/AdminLayout"
import { Careers, Subject, User } from "../../../helpers/interfaces"
import semesterOptions from "../../../helpers/semesterOptions"
import useCareer from "../../../hooks/useCareer"
import useUser from "../../../hooks/useUser"
import useSubject from "../../../hooks/useSubject"
import useSemester from "../../../hooks/useSemester"

const CreateSemester = () => {
  const [career, setCareer] = useState<String>("")
  const [teacher, setTeacher] = useState<String>("")
  const [student, setStudent] = useState<String>("")
  const [subject, setSubject] = useState<String>("")
  const [semester, setSemester] = useState<Number>(0)

  const { careers } = useCareer()
  const { students, teachers } = useUser()
  const { subjects } = useSubject()
  const { createSemester } = useSemester()

  const handleCreateSemester = async (e: any): Promise<void> => {
    e.preventDefault()
    if (!career || !teacher || !student || !subject || !semester) {
      console.error("something is wrong")
      return
    }
    const semesterObject: Object = {
      career,
      teacher,
      student,
      subject,
      semester,
    }
    const data: any = await createSemester(semesterObject)
    if (data?.state) {
      setSubject("")
      setStudent("")
      setTeacher("")
      setCareer("")
      setSemester(0)
    }
    alert(data?.msg)
  }
  return (
    <AdminLayout>
      <div className="min-h-screen w-full bg-sky-600">
        <section className="w-full pt-[50px] pb-10">
          <form
            onSubmit={handleCreateSemester}
            className=" mx-4 md:mx-auto md:w-1/2"
          >
            <legend className="text-center text-4xl text-white font-black mb-10">
              Create a semester
            </legend>
            <select
              value={String(career)}
              onChange={(e) => setCareer(String(e.target.value))}
              className="p-2 rounded-full w-full mb-2"
            >
              <option value={""} disabled>
                Select a career{" "}
              </option>
              {career?.length
                ? careers?.map((careerr: Careers) => (
                    <option
                      key={String(careerr?._id)}
                      value={String(careerr?._id)}
                    >
                      {careerr?.name}{" "}
                    </option>
                  ))
                : null}
            </select>
            <select
              value={Number(semester)}
              onChange={(e) => setSemester(Number(e.target.value))}
              className="p-2 rounded-full w-full mb-2"
            >
              <option value={0}>Select a semester number </option>
              {semesterOptions?.length
                ? semesterOptions?.map((semester) => (
                    <option key={semester.value} value={semester.value}>
                      {semester.opt}
                    </option>
                  ))
                : null}
            </select>
            <select
              value={String(teacher)}
              onChange={(e) => setTeacher(String(e.target.value))}
              className="p-2 rounded-full w-full mb-2"
            >
              <option value={0}>Select a teacher </option>
              {teachers?.length
                ? teachers.map((tch: User) => (
                    <option key={String(tch?._id)} value={String(tch?._id)}>
                      {tch?.personalData?.firstName}{" "}
                      {tch?.personalData?.lastName}
                    </option>
                  ))
                : null}
            </select>
            <select
              value={String(student)}
              onChange={(e) => setStudent(String(e.target.value))}
              className="p-2 rounded-full w-full mb-2"
            >
              <option value={0}>Select a student </option>
              {students?.length
                ? students.map((tch: User) => (
                    <option key={String(tch?._id)} value={String(tch?._id)}>
                      {tch?.personalData?.firstName}{" "}
                      {tch?.personalData?.lastName}
                    </option>
                  ))
                : null}
            </select>
            <select
              value={String(subject)}
              onChange={(e) => setSubject(String(e.target.value))}
              className="p-2 rounded-full w-full mb-2"
            >
              <option value={0}>Select a subject </option>
              {subjects?.length
                ? subjects.map((sbj: Subject) => (
                    <option key={String(sbj?._id)} value={String(sbj?._id)}>
                      {sbj?.name}
                    </option>
                  ))
                : null}
            </select>
            <div className="flex justify-center flex-col">
              <label className="text-xl font-bold text-white">Planning</label>
              <input type="file" />
            </div>
            <input
              type="submit"
              value="Create Task"
              className="text-xl font-bold text-white px-4 py-2 text-center bg-red-400 hover:bg-red-500 transition-colors cursor-pointer w-full rounded-full mt-4"
            />
          </form>
        </section>
      </div>
    </AdminLayout>
  )
}

export default CreateSemester
