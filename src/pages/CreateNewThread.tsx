import apiCreateThread from "../services/CreateTheadService";
import ForumForm from "../components/Forum/ForumForm";
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
        apiCreateThread(thread, setError, navigate);
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
