import useForumHandler from "../hooks/useForumHandler";
import apiCreateThread from "../services/CreateTheadService";
import ForumForm from "../components/Forum/ForumForm";
import { Typography } from "@mui/material";
import React from "react";

const CreateThread: React.FC = () => {
    const initialThread = { title: "", content: "", categories: [] };
    const { thread, setThread, error, setError, handleSubmit } = useForumHandler({
        initialThread: initialThread,
        saveThread: apiCreateThread,
    });
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
