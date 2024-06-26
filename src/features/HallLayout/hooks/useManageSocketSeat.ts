import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SelectedSeat } from "../interfaces/SelectedSeat";
import { selectSeat, unselectSeat } from "../../../store/webSocket/socketSlice";

export const useManageSocketSeat = (selectedSeat: SelectedSeat | null, modalState: boolean, projectionId: string) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedSeat && modalState) {
            dispatch(selectSeat({ seat: { ...selectedSeat.seat, projectionId } }));
        }

        return () => {
            if (selectedSeat) {
                dispatch(unselectSeat({ seat: { ...selectedSeat?.seat, projectionId } }));
            }
        };
    }, [selectedSeat, modalState]);
};
