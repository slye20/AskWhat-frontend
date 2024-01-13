import MainPostCard from "./MainPostCard";
import ForumForm from "./ForumForm";
import Thread from "../../types/Thread";
import apiUpdateThread from "../../services/UpdateThreadService";
import useForumHandler from "../../hooks/useForumHandler";
import { Card, CardContent } from "@mui/material";
import React, { useState } from "react";

type Prop = {
    data: Thread;
};

const MainPost: React.FC<Prop> = ({ data }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const { thread, setThread, error, setError, handleSubmit } = useForumHandler({
        initialThread: data,
        saveThread: apiUpdateThread,
    });

    return (
        <Card variant="outlined" sx={{ marginBottom: 2, boxShadow: 1 }}>
            {edit ? (
                <CardContent sx={{ paddingRight: 4 }}>
                    <ForumForm
                        thread={thread}
                        error={error}
                        setThread={setThread}
                        setError={setError}
                        handleSubmit={(event) => {
                            setEdit(false);
                            handleSubmit(event);
                        }}
                    />
                </CardContent>
            ) : (
                <MainPostCard thread={thread} error={error} setError={setError} setEdit={setEdit} />
            )}
        </Card>
    );
};

export default MainPost;
