import { useContext } from "react"
import { SubjectContext } from "../context/subjectProvider"

const useSubject = () => {
  return useContext(SubjectContext)
}

export default useSubject
