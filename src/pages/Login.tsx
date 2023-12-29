import { Button, TextField, Typography } from "@mui/material";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [user, setUser] = useState({ username: "samuel", password: "a1s2d3f4g5" });
    const [error, setError] = useState("");

    // When submit button is pressed, add thread, reroute to new thread
    const handleSubmit = (event: FormEvent) => {
        // prevent page from refreshing
        event.preventDefault();
        const { username, password } = user;

        // Check for empty fields
        if (!username.trim() || !password.trim()) {
            setError("Username or Password cannot be empty.");
            return;
        }

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user }),
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else if (res.status === 401) {
                    // Handle 401 Unauthorized response
                    throw new Error("Unauthorized access. Please check your credentials.");
                } else {
                    throw new Error("An error occurred. Please try again later.");
                }
            })
            .then((data) => {
                localStorage.setItem("jwt", data.jwt);
                navigate(`/`);
            })
            .catch((error) => setError(error.message));
    };

    const handleChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [field]: event.target.value });
        setError("");
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
                    {"Log In"}
                </Typography>

                <form
                    onSubmit={(event) => handleSubmit(event)}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <TextField
                        name="username"
                        label="Username"
                        value={user.username}
                        onChange={handleChange("username")}
                        sx={{ m: 1 }}
                    />
                    <TextField
                        name="password"
                        label="Password"
                        value={user.password}
                        type="password"
                        onChange={handleChange("password")}
                        sx={{ m: 1 }}
                    />

                    {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}

                    <Button color="warning" variant="contained" type="submit" sx={{ m: 1 }}>
                        Log In
                    </Button>
                    <Button color="warning" variant="contained" sx={{ m: 1 }} onClick={() => navigate(`/signup`)}>
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
