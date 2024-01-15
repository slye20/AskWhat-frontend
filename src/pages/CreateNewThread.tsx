import useForumHandler from "../hooks/useForumHandler";
import apiCreateThread from "../services/CreateTheadService";
import ForumForm from "../components/Forum/ForumForm";
import { Typography } from "@mui/material";
import React from "react";

/**
 * Page component for creating a new thread in the forum.
 *
 * This component provides a form interface for users to create a new thread. It uses the `useForumHandler` hook to manage the form
 * state and handle the submission process. The form includes fields for the thread's title, content, and category selection.
 * Upon submission, the thread is created using the `apiCreateThread` service.
 *
 * @component
 * @returns {React.ReactElement} A React element representing the page for creating a new forum thread, including a form for thread creation.
 */

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
