import { useContext } from "react"
import { CareerContext } from "../context/careerProvicer"

const useCareer: any = () => {
  return useContext(CareerContext)
}

export default useCareer
