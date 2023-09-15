import { useContext } from "react"
import { UserContext } from "../context/userProvider"

const useUser: any = () => {
  return useContext(UserContext)
}

export default useUser
