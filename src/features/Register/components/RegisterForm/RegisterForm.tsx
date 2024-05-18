import { Form } from "react-bootstrap";
import Button from "../../../common/components/Button/Button";
import { useForm } from "../../../common/hooks/useForm";
import { useRegister } from "../../hooks/useRegister";

const RegisterForm = () => {
    const { registerHandler } = useRegister();

    const { formValues, onChangeHandler, onSubmit, validated } = useForm(
        {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        async (): Promise<void> => await registerHandler(formValues)
    );

    return (
        <Form onSubmit={onSubmit} noValidate validated={validated}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control required name="firstName" minLength={2} value={formValues.firstName} onChange={onChangeHandler} />
                <Form.Control.Feedback type="invalid">Please provide a name.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control required name="lastName" value={formValues.lastName} onChange={onChangeHandler} />
                <Form.Control.Feedback type="invalid">Please provide a name.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required name="email" value={formValues.email} onChange={onChangeHandler} type="email" placeholder="e.g. bob@cinema.com" />
                <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required name="password" value={formValues.password} onChange={onChangeHandler} type="password" placeholder="Password" />
                <Form.Control.Feedback type="invalid">Please provide a password (5 chars min).</Form.Control.Feedback>
            </Form.Group>
            <Button>Register</Button>
        </Form>
    );
};

export default RegisterForm;
