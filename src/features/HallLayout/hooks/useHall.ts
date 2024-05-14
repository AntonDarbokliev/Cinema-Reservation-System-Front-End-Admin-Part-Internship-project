import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Hall } from "../../HallsList/interfaces/hallInterface";
import { getHall } from "../service/hallLayoutService";

export const useHall = () => {
    const params = useParams();
    const [hall, setHall] = useState<Hall>({ _id: "", numberOfSeats: 0, seatsLayout: [] });

    useEffect(() => {
      if(params.id)
      getHall(params.id).then(data => setHall(data));
    },[])

    return {
      hall
    }
};
