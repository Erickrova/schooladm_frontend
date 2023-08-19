import { useContext } from "react"
import { CareerContext } from "../context/careerProvicer"

const useCareer = () => {
  return useContext(CareerContext)
}

export default useCareer
