import ForumForm from "../components/ForumForm";
import Thread from "../types/Thread";
import { Typography } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateThread: React.FC = () => {
    const [thread, setThread] = useState<Thread>({ title: "", content: "", categories: [] });
    const [error, setError] = useState(""); // error if content is empty
    const navigate = useNavigate();

    // When submit button is pressed, add thread, reroute to new thread
    const handleSubmit = (event: FormEvent) => {
        // prevent page from refreshing
        event.preventDefault();

        fetch("http://localhost:3000/forum_threads/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.jwt}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ thread }),
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else if (res.status === 401) {
                    // 401 unauthorized
                    navigate("/login");
                } else if (res.status === 406 || res.status === 422) {
                    // 406 not acceptable
                    return res.json().then((err) => {
                        console.log(err);
                        throw new Error(err.error.join("\n"));
                    });
                } else {
                    throw new Error("An error occurred. Please try again later.");
                }
            })
            .then(() => {
                navigate(`/`);
            })
            .catch((error) => setError(error.message));
    };

    return (
        <div style={{ margin: "auto", textAlign: "center", width: "80vw" }}>
            <Typography variant="h5" component="h5" marginTop={2}>
                {"Create New Thread"}
            </Typography>
            <ForumForm
                thread={thread}
                error={error}
                setThread={setThread}
                setError={setError}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default CreateThread;
