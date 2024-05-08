import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./LoginContainer.module.scss";
import { useForm } from "../../common/hooks/useForm";
import { useLogin } from "../hooks/useLogin";

export const LoginContainer = () => {
    const { loginHandler } = useLogin();

    const { formValues, onChangeHandler, onSubmit } = useForm(
        {
            email: "",
            password: "",
        },
        async (): Promise<void> => await loginHandler(formValues)
    );
    return (
        <div className={styles["login-container"]}>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" value={formValues.email} onChange={onChangeHandler} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        value={formValues.password}
                        onChange={onChangeHandler}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
    ``;
};
