import useForm from "../../hooks/useForm";
import CustomButton from "../UI/CustomButton";
import apiSignUp from "../../services/SignUpService";
import { TextField } from "@mui/material";
import React from "react";

/**
 * Represents a sign up form component for user authentication.
 *
 * This component presents input fields for username, email and password, and buttons for login and signup.
 * It utilizes the `useForm` hook for form state management, including handling input changes and form submission.
 * Upon submission, it calls the `apiSignUp` service with the entered credentials.
 *
 * @returns {React.ReactElement} A React element representing a login form.
 */

const SignUpForm = () => {
    const initialValue = { username: "", password: "", email: "" };
    const { values: user, errors, setErrors, handleChange, handleSubmit, navigate } = useForm(initialValue);

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
