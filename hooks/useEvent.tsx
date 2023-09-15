import { useContext } from "react"
import { EventContext } from "../context/eventProvider"

const useEvent: any = () => {
  return useContext(EventContext)
}

export default useEvent
