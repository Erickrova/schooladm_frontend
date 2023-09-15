import { useContext } from "react"
import { SubjectContext } from "../context/subjectProvider"

const useSubject: any = () => {
  return useContext(SubjectContext)
}

export default useSubject
