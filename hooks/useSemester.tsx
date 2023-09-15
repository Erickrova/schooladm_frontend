import { useContext } from "react"
import { SemesterContext } from "../context/semesterProvider"

const useSemester: any = () => {
  return useContext(SemesterContext)
}

export default useSemester
