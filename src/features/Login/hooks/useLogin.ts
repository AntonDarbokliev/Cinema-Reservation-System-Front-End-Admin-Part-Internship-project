import { useNavigate } from "react-router-dom";
import { LoginUser } from "../interfaces/loginUserInterface";
import { login } from "../services/loginService";
import { useDispatch } from "react-redux";
import { UserState, setUser } from "../../../store/user/userActions";
import { jwtDecode } from "jwt-decode";
// import { IRootState } from "../../../store/store";

export const useLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const user = useSelector((state: IRootState) => state.user);

    const loginHandler = async (loginData: LoginUser) => {
        const response: { access_token: string } = await login(loginData);
        localStorage.setItem("token", response.access_token);
        const decodedToken: UserState = await jwtDecode(response.access_token);
        dispatch(setUser(decodedToken));

        navigate("/");
    };

    return {
        loginHandler,
    };
};
