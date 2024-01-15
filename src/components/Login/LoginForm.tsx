import useForm from "../../hooks/useForm";
import apiLogin from "../../services/LoginService";
import CustomButton from "../UI/CustomButton";
import { TextField } from "@mui/material";
import React from "react";

/**
 * Represents a login form component for user authentication.
 *
 * This component presents input fields for username and password, and buttons for login and signup.
 * It utilizes the `useForm` hook for form state management, including handling input changes and form submission.
 * Upon submission, it calls the `apiLogin` service with the entered credentials.
 *
 * @returns {React.ReactElement} A React element representing a login form.
 */

const LoginForm = () => {
    const initialValue = { username: "", password: "" };
    const { values: user, errors, setErrors, handleChange, handleSubmit, navigate } = useForm(initialValue);

    return (
        <form
            onSubmit={(event) => {
                handleSubmit(event);
                apiLogin(user as { username: string; password: string }, setErrors, navigate);
            }}
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <TextField name="username" label="Username" value={user.username} onChange={handleChange} sx={{ m: 1 }} />
            <TextField
                name="password"
                label="Password"
                value={user.password}
                type="password"
                onChange={handleChange}
                sx={{ m: 1 }}
            />

            {errors && <div style={{ color: "red", margin: "10px 0", whiteSpace: "pre-line" }}>{errors}</div>}

            <CustomButton label="Log In" type="submit" />
            <CustomButton label="Sign Up" onClick={() => navigate(`/signup`)} />
        </form>
    );
};

export default LoginForm;
