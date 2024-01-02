import MainPostCard from "./MainPostCard";
import ForumForm from "./ForumForm";
import Thread from "../types/Thread";

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
        fetch(`http://localhost:3000/forum_threads/${threadId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.jwt}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ thread }),
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    navigate("/");
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
            .catch((error) => setError(error.message));
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        fetch(`http://localhost:3000/forum_threads/${threadId}`, {
            method: "PATCH",
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
            .catch((error) => setError(error.message));
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
