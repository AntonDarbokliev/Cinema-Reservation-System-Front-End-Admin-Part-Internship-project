import { Button, Form } from "react-bootstrap";
import { useLogin } from "../hooks/useLogin";
import { useForm } from "../../common/hooks/useForm";

export const LoginForm = () => {
  const { loginHandler } = useLogin();

  const { formValues, onChangeHandler, onSubmit } = useForm(
      {
          email: "",
          password: "",
      },
      async (): Promise<void> => await loginHandler(formValues)
  );

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" value={formValues.email} onChange={onChangeHandler} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" value={formValues.password} onChange={onChangeHandler} type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    );
};
