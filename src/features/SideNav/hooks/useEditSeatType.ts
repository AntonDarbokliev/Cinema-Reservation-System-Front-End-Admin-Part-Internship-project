import { SeatType } from "../../HallsList/interfaces/SeatType";
import { makeFormData } from "../../common/utils/makeFormData";
import { EditSeatType } from "../interfaces/EditSeatType";
import { editSeatType } from "../service/sideNavService";

export const useEditSeatType = (stateSetter?: React.Dispatch<React.SetStateAction<SeatType[] | undefined>>) => {
    const editFoodAndBeverageHandler = async (data: EditSeatType, seatTypeId: string) => {
        const formData = makeFormData(data);
        const seatType = await editSeatType(formData, seatTypeId);
        if (stateSetter) {
            stateSetter((state) => {
                if (state) {
                    const stateCopy = state.slice();
                    const index = state.findIndex((seatType) => seatType._id === seatTypeId);
                    stateCopy[index] = seatType;
                    return stateCopy;
                }
            });
        }
    };

    return {
        editFoodAndBeverageHandler,
    };
};
