import { useNavigate, useParams } from "react-router-dom";

export const useSelectionCountdownEnd = (modalSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
    const navigate = useNavigate();
    const cinemaId = useParams().id;
    const selectionCountdownEndHandler = () => {
        modalSetter(false);
        setTimeout(() => {
            navigate(`/cinema/${cinemaId}/movies`);
        }, 100);
    };
    return {
        selectionCountdownEndHandler,
    };
};
