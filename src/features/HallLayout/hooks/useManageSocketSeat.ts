import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SelectedSeat } from "../interfaces/SelectedSeat";
import { selectSeat } from "../../../store/webSocket/socketSlice";

export const useManageSocketSeat = (selectedSeat: SelectedSeat | null, modalState: boolean, projectionId: string) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedSeat && modalState) {
            dispatch(selectSeat({ seat: { ...selectedSeat.seat, projectionId } }));
        }
    }, [selectedSeat, modalState]);
};
