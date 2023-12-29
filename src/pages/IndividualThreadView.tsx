import MakeComment from "../components/MakeComment";
import BasicCommentList from "../components/CommentList";
import Comment from "../types/Comment";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

const StyledThreadView: React.FC = () => {
    const { threadId } = useParams();
    const navigate = useNavigate();
    const [result, setResult] = useState<{ title: string; posts: Comment[] }>({ title: "", posts: [] });

    useEffect(() => {
        const url = `http://localhost:3000/posts/${threadId}`;
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
            .then((t) => setResult(t))
            .catch(() => navigate("/"));
    }, []);

    const handleAddComment = (newComment: Comment) => {
        setResult({
            ...result,
            posts: [...result.posts, newComment],
        });
    };

    return (
        <div style={{ width: "80vw", margin: "auto" }}>
            <Link to="/">
                <Button variant="contained" color="secondary" style={{ margin: "10px 20px" }}>
                    {"Back to threads"}
                </Button>
            </Link>

            {/* <Card> */}
            {/* <CardContent>
                    <Typography component="p">{"Viewing thread:"}</Typography>
                    <Typography variant="h5" component="h5">
                        {"Inspirational Quotes"}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        {"by Aiken"}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {'"The best way to predict the future is to invent it."'}
                        <br />
                        {"- Alan Kay"}
                    </Typography>
                </CardContent> */}
            {/* </Card> */}
            <Typography variant="h5" component="h5">
                {result.title}
            </Typography>
            <BasicCommentList comments={result.posts} />
            <MakeComment onAddComment={handleAddComment} />
        </div>
    );
};

export default StyledThreadView;
