import { deleteSeatType } from "../service/sideNavService";

export const useDeleteSeatType = () => {
    const deleteSeatTypeHandler = async (id: string) => {
        await deleteSeatType(id);
    };
    return {
        deleteSeatTypeHandler,
    };
};
