import LoginForm from "../components/Login/LoginForm";
import React from "react";
import { Typography } from "@mui/material";

const Login: React.FC = () => {
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
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;
