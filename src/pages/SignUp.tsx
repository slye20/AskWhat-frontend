import SignUpForm from "../components/SignUp/SignUpForm";
import { Typography } from "@mui/material";
import React from "react";

const SignUp: React.FC = () => {
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
                <SignUpForm />
            </div>
        </div>
    );
};

export default SignUp;
