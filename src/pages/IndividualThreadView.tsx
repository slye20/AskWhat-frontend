import MakeComment from "../components/MakeComment";
import BasicCommentList from "../components/CommentList";
import Comment from "../types/Comment";
import Thread from "../types/Thread";
import { Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

const StyledThreadView: React.FC = () => {
    const { threadId } = useParams();
    const navigate = useNavigate();
    const [result, setResult] = useState<{ thread: Thread | undefined; comments: Comment[] }>({
        thread: undefined,
        comments: [],
    });

    useEffect(() => {
        const url = `http://localhost:3000/forum_threads/${threadId}`;
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.jwt}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((res) => setResult(res))
            .catch(() => navigate("/"));
    }, []);

    const handleAddComment = (newComment: Comment) => {
        setResult({
            ...result,
            comments: [...result.comments, newComment],
        });
    };

    return (
        <div style={{ width: "80vw", margin: "auto" }}>
            <Button variant="contained" color="secondary" style={{ margin: "10px 20px" }} onClick={() => navigate("/")}>
                {"Back to threads"}
            </Button>
            <Typography variant="h5" component="h5">
                {result.thread?.title}
            </Typography>
            <BasicCommentList comments={result.comments} />
            <MakeComment onAddComment={handleAddComment} />
        </div>
    );
};

export default StyledThreadView;
