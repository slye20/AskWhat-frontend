import { Button, TextField, Typography } from "@mui/material";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
    const [user, setUser] = useState({ username: "", password: "", email: "" });
    const [errors, setErrors] = useState({
        username: false,
        password: false,
        email: false,
    }); // error if content is empty

    // When submit button is pressed, add thread, reroute to new thread
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault(); // prevent page from refreshing
        console.log(user);
        const { username, password, email } = user;
        const newErrors = {
            password: !password.trim(),
            username: !username.trim(),
            email: !email.trim(),
        };

        if (newErrors.password || newErrors.username || newErrors.email) {
            setErrors(newErrors);
            return;
        }
    };

    const handleChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [field]: event.target.value });
        setErrors({ ...errors, [field]: false });
    };

    const navigate = useNavigate();

    return (
        <div style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
            <div
                style={{
                    width: "100%",
                    maxWidth: "500px",
                }}
            >
                <Typography variant="h5" component="h5" marginTop={2}>
                    {"Sign Up"}
                </Typography>

                <form
                    onSubmit={(event) => handleSubmit(event)}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <TextField
                        error={errors.username}
                        helperText={errors.username ? "This field cannot be empty." : ""}
                        name="username"
                        label="Username"
                        onChange={handleChange("username")}
                        sx={{ m: 1 }}
                    />
                    <TextField
                        error={errors.email}
                        helperText={errors.email ? "This field cannot be empty." : ""}
                        name="email"
                        label="Email"
                        onChange={handleChange("email")}
                        sx={{ m: 1 }}
                    />
                    <TextField
                        error={errors.password}
                        helperText={errors.password ? "This field cannot be empty." : ""}
                        name="password"
                        label="Password"
                        type="password"
                        onChange={handleChange("password")}
                        sx={{ m: 1 }}
                    />
                    <Button color="warning" variant="contained" type="submit" sx={{ m: 1 }}>
                        Sign Up
                    </Button>
                    <Button color="warning" variant="contained" sx={{ m: 1 }} onClick={() => navigate(`/login`)}>
                        Back to Login
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
