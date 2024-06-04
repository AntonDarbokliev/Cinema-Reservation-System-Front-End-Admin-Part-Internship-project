import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { connectionLost, initSocket } from "../../../store/webSocket/socketSlice";

export const useSocketConnection = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initSocket());

        return () => {
            dispatch(connectionLost());
        };
    }, []);
};
