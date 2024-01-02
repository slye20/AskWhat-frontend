import MainPost from "../components/MainPost";
import MakeComment from "../components/MakeComment";
import BasicCommentList from "../components/CommentList";
import Comment from "../types/Comment";
import Thread from "../types/Thread";
import { Button } from "@mui/material";
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
        fetch(`http://localhost:3000/forum_threads/${threadId}`)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((res) => setResult(res))
            .catch(() => navigate("/"));
    }, []);

    return (
        <div style={{ width: "80vw", margin: "auto" }}>
            <Button variant="contained" color="secondary" style={{ margin: "10px 20px" }} onClick={() => navigate("/")}>
                {"Back to threads"}
            </Button>
            <MainPost thread1={result.thread} />
            <BasicCommentList comments={result.comments} />
            {localStorage.jwt ? (
                <MakeComment />
            ) : (
                <Button variant="contained" color="secondary" onClick={() => navigate("/login")}>
                    Log In to Comment
                </Button>
            )}
        </div>
    );
};

export default StyledThreadView;
