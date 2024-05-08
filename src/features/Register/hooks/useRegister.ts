import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../interfaces/RegisterUser";
import { register } from "../services/registerService";

export const useRegister = () => {
    const navigate = useNavigate();
    const registerHandler = async (registerData: RegisterUser) => {
        await register(registerData);
        navigate('/login')
    };

    return {
      registerHandler
    }
};
