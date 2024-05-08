import { Form } from "react-bootstrap";
import ButtonC from "../../../common/components/ButtonC/ButtonC";
import { useForm } from "../../../common/hooks/useForm";
import { useRegister } from "../../hooks/useRegister";

const RegisterForm = () => {
    const { registerHandler } = useRegister();

    const { formValues, onChangeHandler, onSubmit } = useForm(
        {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        async (): Promise<void> => await registerHandler(formValues)
    );

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control name="firstName" value={formValues.firstName} onChange={onChangeHandler} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="lastName" value={formValues.lastName} onChange={onChangeHandler} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" value={formValues.email} onChange={onChangeHandler} type="email" placeholder="e.g. bob@cinema.com" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" value={formValues.password} onChange={onChangeHandler} type="password" placeholder="Password" />
            </Form.Group>
            <ButtonC text="Register" />
        </Form>
    );
};

export default RegisterForm;
