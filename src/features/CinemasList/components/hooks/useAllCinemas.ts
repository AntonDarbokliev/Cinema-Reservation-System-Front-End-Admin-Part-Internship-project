import { useEffect, useState } from "react"
import { Cinema } from "../../interfaces/cinemaInterface"
import { getAllCinemas } from "../../services/cinemasListService"

export const useAllCinemas = () => {
  const [cinemas, setCinemas] = useState<Cinema[]>([])

  useEffect(() => {
    getAllCinemas()
    .then(fetchedCinemas => setCinemas(fetchedCinemas))
  },[])

  return {
    cinemas,
    setCinemas
  }
}