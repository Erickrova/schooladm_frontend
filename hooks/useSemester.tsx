import { useContext } from "react"
import { SemesterContext } from "../context/semesterProvider"

const useSemester = () => {
  return useContext(SemesterContext)
}

export default useSemester
