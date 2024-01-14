import useForm from "../../hooks/useForm";
import apiLogin from "../../services/LoginService";
import CustomButton from "../UI/CustomButton";
import { TextField } from "@mui/material";
import React from "react";

const LoginForm = () => {
    const initialValue = { username: "samuel", password: "a1s2d3f4g5" }; //remove
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
