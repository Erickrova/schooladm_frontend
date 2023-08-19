import { useContext } from "react"
import { EventContext } from "../context/eventProvider"

const useEvent = () => {
  return useContext(EventContext)
}

export default useEvent
