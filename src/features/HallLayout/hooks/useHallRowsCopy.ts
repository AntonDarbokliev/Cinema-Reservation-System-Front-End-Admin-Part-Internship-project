import { useEffect, useState } from "react";
import { Hall, Row } from "../../HallsList/interfaces/hallInterface";

export const useHallRowsCopy = (hall: Hall) => {
    const [rows, setRows] = useState<Row[]>([]);

    useEffect(() => {
        setRows([...hall.seatsLayout]);
    }, [hall.seatsLayout]);

    return {
      rows,
      setRows
    }
};
