import useForm from "../../hooks/useForm";
import CustomButton from "../ui/CustomButton";
import apiSignUp from "../../services/SignUpService";
import { TextField } from "@mui/material";
import React from "react";

const SignUpForm = () => {
    const initialValue = { username: "", password: "", email: "" };
    const { values: user, errors, setErrors, handleChange, handleSubmit, navigate } = useForm(initialValue);
    setErrors;
    return (
        <form
            onSubmit={(event) => {
                handleSubmit(event);
                apiSignUp(user as { username: string; email: string; password: string }, setErrors, navigate);
            }}
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <TextField name="username" label="Username" value={user.username} onChange={handleChange} sx={{ m: 1 }} />
            <TextField name="email" label="Email" value={user.email} onChange={handleChange} sx={{ m: 1 }} />
            <TextField
                name="password"
                label="Password"
                value={user.password}
                type="password"
                onChange={handleChange}
                sx={{ m: 1 }}
            />

            {errors && <div style={{ color: "red", margin: "10px 0", whiteSpace: "pre-line" }}>{errors}</div>}

            <CustomButton label="Sign Up" type="submit" />
            <CustomButton label="Back to Login" onClick={() => navigate(`/login`)} />
        </form>
    );
};

export default SignUpForm;
