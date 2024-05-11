import { useEffect } from "react";
import { clearUser } from "../../store/user/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearUser());
        navigate("/");
    });

    return <></>;
};
