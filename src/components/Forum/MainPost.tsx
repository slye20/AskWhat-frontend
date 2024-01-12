import MainPostCard from "./MainPostCard";
import ForumForm from "./ForumForm";
import Thread from "../../types/Thread";
import apiDeleteThread from "../../services/DeleteThreadService";
import apiUpdateThread from "../../services/UpdateThreadService";

import { Card, CardContent } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Prop = {
    thread1?: Thread;
};

const MainPost: React.FC<Prop> = ({ thread1 }) => {
    if (!thread1) {
        return null;
    }
    const { threadId } = useParams();
    const [edit, setEdit] = useState<boolean>(false);
    const [thread, setThread] = useState<Thread>(thread1);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleEdit = () => {
        setEdit(true);
    };

    const handleDelete = () => {
        apiDeleteThread(threadId as string, setError, navigate);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        apiUpdateThread(thread, threadId as string, setError, navigate);
        setEdit(false);
    };

    return (
        <Card variant="outlined" sx={{ marginBottom: 2, boxShadow: 1 }}>
            {edit ? (
                <CardContent sx={{ paddingRight: 4 }}>
                    <ForumForm
                        thread={thread}
                        error={error}
                        setThread={setThread}
                        setError={setError}
                        handleSubmit={handleSubmit}
                    />
                </CardContent>
            ) : (
                <MainPostCard thread={thread} handleEdit={handleEdit} handleDelete={handleDelete} />
            )}
        </Card>
    );
};

export default MainPost;
