import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

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
