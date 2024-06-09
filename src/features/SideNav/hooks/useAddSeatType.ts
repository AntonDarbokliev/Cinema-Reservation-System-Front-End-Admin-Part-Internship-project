import { makeFormData } from "../../common/utils/makeFormData";
import { CreateSeatType } from "../interfaces/CreateSeatType";
import { addSeatType } from "../service/sideNavService";

export const useAddSeatType = () => {
    const addSeatTypeHandler = async (data: CreateSeatType, image?: File) => {
        const formData = makeFormData(data);
        if (image) {
            formData.append("image", image);
        }

        return await addSeatType(formData);
    };
    return {
        addSeatTypeHandler,
    };
};
