import { useEffect, useState } from "react"
import ProfileLayout from "../../components/layouts/ProfileLayout"
import useAuth from "../../hooks/useAuth"
import QualificationCard from "../../components/cards/QualificationCard"
import { Semester, Subject, User } from "../../helpers/interfaces"
import useUser from "../../hooks/useUser"

const Qualifications = () => {
  const [userSemesters, setUserSemesters] = useState<Array<Semester>>()
  const [semesterSelected, setSemesterSelected] = useState<number>()
  const [subjects, setSubjects] = useState<Array<Subject>>()
  const [subjectSelected, setSubjectSelected] = useState<string>()
  const [qualifications, setQualifications] = useState<Array<any>>()

  const { getQualifications } = useUser()
  const { profile, auth } = useAuth()
  const { personalData } = profile

  useEffect(() => {
    if (personalData) {
      // setting userSemesters
      const semestersUser: Array<Semester> =
        personalData?.career?.semesters.filter((semester: Semester) =>
          semester.students.some((student: User) => student._id == profile._id),
        )
      setUserSemesters(semestersUser)
    }
  }, [personalData, profile])
  useEffect(() => {
    if (semesterSelected) {
      // setting subjects
      const semestersUser: Array<Semester> =
        personalData?.career?.semesters.filter(
          (semester: Semester) => semester.semester == semesterSelected,
        )
      const subjectss: Array<Subject> = semestersUser[0].subjects
      if (subjectss.length) {
        setSubjects(subjectss)
      } else {
        setSubjects([])
      }
    } else {
      setSubjects([])
    }
  }, [semesterSelected, personalData])
  useEffect(() => {
    const handleQualifications = async () => {
      if (!subjectSelected || !semesterSelected) {
        setQualifications([])
        return
      }
      const data = await getQualifications(
        semesterSelected,
        subjectSelected,
        auth._id,
      )
      setQualifications(data)
    }
    handleQualifications()
  }, [
    semesterSelected,
    subjectSelected,
    auth,
    getQualifications,
    setQualifications,
  ])
  return (
    <ProfileLayout>
      <div>
        <h1 className="text-center text-4xl text-white font-black my-5">
          Qualifications
        </h1>
        <form className=" mx-4 md:mx-auto md:w-1/2 pb-5 ">
          <div className="flex justify-center flex-col gap-4 md:flex-row">
            <select
              value={semesterSelected}
              onChange={(e) => setSemesterSelected(Number(e.target.value))}
              className="p-2 rounded-full w-full"
            >
              <option value="">Select a semester </option>
              {userSemesters?.length
                ? userSemesters.map((semester: Semester) => (
                    <option key={semester._id} value={semester.semester}>
                      {semester.semester}{" "}
                    </option>
                  ))
                : null}
            </select>
            <select
              value={subjectSelected}
              onChange={(e) => setSubjectSelected(e.target.value)}
              className="p-2 rounded-full w-full"
            >
              <option value="">Select a subject </option>
              {subjects?.length
                ? subjects?.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}{" "}
                    </option>
                  ))
                : null}
            </select>
          </div>
          <div>
            {qualifications?.length ? (
              <ul className="md:w-2/3 mx-auto px-4">
                {qualifications.map((q: any) => (
                  <QualificationCard
                    key={q.studentTask._id}
                    data={q.task}
                    task={q.studentTask}
                  />
                ))}
              </ul>
            ) : (
              <p className="pt-[50px] text-center text-4xl text-white font-black mb-10">
                no items
              </p>
            )}
          </div>
        </form>
      </div>
    </ProfileLayout>
  )
}

export default Qualifications
