import ProfileLayout from "../../components/layouts/ProfileLayout"
import useAuth from "../../hooks/useAuth"
import { useEffect, useState } from "react"
import { Semester, Subject } from "../../helpers/interfaces"
import useSemester from "../../hooks/useSemester"

const AboutCareer = () => {
  const [semesters, setSemesters] = useState<Array<Semester>>([])
  const { profile } = useAuth()
  const { getSemestersSubjects } = useSemester()
  const { personalData } = profile
  useEffect(() => {
    const call = async () => {
      if (profile?.personalData?.career?._id) {
        const data = await getSemestersSubjects(profile.personalData.career._id)
        const semestersSort = data.sort((a: Semester, b: Semester) =>
          a.semester > b.semester ? 1 : -1,
        )
        setSemesters(semestersSort)
      }
    }
    call()
  }, [profile, getSemestersSubjects])
  return (
    <ProfileLayout>
      <div>
        <h1 className="text-center text-4xl text-white font-black mt-5">
          About Career
        </h1>
        <div className="md:w-2/3 md:mx-auto md:flex md:flex-col md:justify-center">
          <h2 className="text-center text-3xl text-white font-black my-5">
            {personalData?.career?.name}
          </h2>
          <p className="mb-2 text-white whitespace-pre-wrap0">
            {personalData?.career?.description}
          </p>
        </div>
        <div className="pb-4">
          <h2 className="text-center text-3xl text-white font-black my-5">
            Semesters&apos; Subjects
          </h2>
          <table className="md:w-2/3 md:mx-auto w-full mb-2">
            {semesters.length
              ? semesters.map((semester: Semester) => (
                  <tbody key={semester.semester}>
                    <tr className="border border-collapse border-black">
                      <th className="text-black text-center p-2 border border-black  bg-gray-400">
                        semester
                      </th>
                      <th className="text-black text-center p-2 border border-black bg-gray-400">
                        subjects
                      </th>
                    </tr>
                    {semester?.subjects.map((subject: Subject) => (
                      <tr
                        key={subject._id}
                        className="border border-collapse border-black"
                      >
                        <td className="text-black bg-gray-100 text-center font-bold p-2 border border-black">
                          {semester.semester}
                        </td>
                        <td className="text-black bg-gray-100 text-center p-2 border border-black">
                          {subject.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ))
              : null}
          </table>
        </div>
      </div>
    </ProfileLayout>
  )
}

export default AboutCareer
