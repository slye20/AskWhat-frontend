import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for managing form state and handling form submission logic.
 *
 * This hook initializes with a set of initial form values and provides mechanisms to update these values and manage errors.
 * It handles changes to form fields and prevents the default form submission action.
 * The hook also provides navigation functionality, enabling redirection after form actions if necessary.
 *
 * @param {FormValues} initialValue - The initial values for the form fields.
 * @returns {{ values, errors, setErrors, handleChange, handleSubmit, navigate }} An object containing form field values, error states, handlers for changes and submission, and a navigate function.
 */

type FormValues = { [key: string]: string }; // eslint-disable-line @typescript-eslint/no-explicit-any

const useForm = (initialValue: FormValues) => {
    const [values, setValues] = useState(initialValue);
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
        setErrors("");
    };

    const handleSubmit = (event: FormEvent) => {
        // prevent page from refreshing
        event.preventDefault();
    };

    return { values, errors, setErrors, handleChange, handleSubmit, navigate };
};
export default useForm;
