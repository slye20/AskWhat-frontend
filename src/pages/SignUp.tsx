import { Button, TextField, Typography } from "@mui/material";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
    const [user, setUser] = useState({ username: "", password: "", email: "" });
    const [error, setError] = useState("");

    // When submit button is pressed, add thread, reroute to new thread
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault(); // prevent page from refreshing

        fetch("http://localhost:3000/signup", {
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
                } else if (res.status === 406) {
                    // 406 not acceptable
                    return res.json().then((err) => {
                        throw new Error(err.error.join("\n"));
                    });
                } else {
                    throw new Error("An error occurred. Please try again later.");
                }
            })
            .then((data) => {
                localStorage.setItem("jwt", data.jwt);
                localStorage.setItem("username", user.username);
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
                    {"Sign Up"}
                </Typography>

                <form
                    onSubmit={(event) => handleSubmit(event)}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <TextField name="username" label="Username" onChange={handleChange("username")} sx={{ m: 1 }} />
                    <TextField name="email" label="Email" onChange={handleChange("email")} sx={{ m: 1 }} />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        onChange={handleChange("password")}
                        sx={{ m: 1 }}
                    />

                    {error && <div style={{ color: "red", margin: "10px 0", whiteSpace: "pre-line" }}>{error}</div>}

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
