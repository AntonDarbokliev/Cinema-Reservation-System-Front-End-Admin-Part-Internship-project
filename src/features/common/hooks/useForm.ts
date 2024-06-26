import { ChangeEvent, FormEvent, useState } from "react";

export const useForm = <T>(initialValue: T, onSubmitHandler?: (values: T) => void) => {
    const [formValues, setFormValues] = useState(initialValue);
    const [validated, setValidated] = useState(false);

    const onChangeHandler = (e: FormEvent | ChangeEvent) => {
        const element = e.target as HTMLInputElement;
        setFormValues((state) => ({ ...state, [element.name]: element.value }));
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);
        if (onSubmitHandler) onSubmitHandler(formValues);
    };

    const resetForm = () => {
        setFormValues(initialValue);
    };

    return {
        formValues,
        onSubmit,
        onChangeHandler,
        resetForm,
        validated
    };
};
