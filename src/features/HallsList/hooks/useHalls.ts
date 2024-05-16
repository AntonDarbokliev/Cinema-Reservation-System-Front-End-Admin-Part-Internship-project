import { useEffect, useState } from "react";
import { Hall } from "../interfaces/hallInterface";
import { getHalls } from "../service/hallsListService";
import { useParams } from "react-router-dom";

export const useHalls = () => {
    const [halls, setHalls] = useState<Hall[]>([]);
    const params = useParams();
    useEffect(() => {
        if (params.id) getHalls(params.id).then((data) => setHalls(data));
    }, []);

    return {
        halls,
    };
};
