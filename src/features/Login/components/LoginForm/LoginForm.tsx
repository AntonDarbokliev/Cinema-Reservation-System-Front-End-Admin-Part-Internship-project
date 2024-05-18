import { useLogin } from "../../hooks/useLogin";
import { useForm } from "../../../common/hooks/useForm";
import Button from "../../../common/components/Button/Button";
import Form from "react-bootstrap/Form";

export const LoginForm = () => {
    const { loginHandler } = useLogin();

    const { formValues, onChangeHandler, onSubmit, validated } = useForm(
        {
            email: "",
            password: "",
        },
        async (): Promise<void> => await loginHandler(formValues)
    );

    return (
        <Form onSubmit={onSubmit} noValidate validated={validated}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required name="email" value={formValues.email} onChange={onChangeHandler} type="email" placeholder="Enter email" />
                <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    minLength={5}
                    name="password"
                    value={formValues.password}
                    onChange={onChangeHandler}
                    type="password"
                    placeholder="Password"
                />
                <Form.Control.Feedback type="invalid">Please provide a password (5 chars min).</Form.Control.Feedback>
            </Form.Group>
            <Button>Login</Button>
        </Form>
    );
};
