import { useEffect, useState } from "react";
import { Hall } from "../interfaces/hallInterface";
import { getHalls } from "../service/hallsListService";

export const useHalls = () => {
    const [halls, setHalls] = useState<Hall[]>([]);

    useEffect(() => {
        getHalls().then((data) => setHalls(data));
    }, []);

    return {
      halls
    }
};
