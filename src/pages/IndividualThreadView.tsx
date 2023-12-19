import MakeComment from "../components/MakeComment";
import BasicCommentList from "../components/CommentList";
import Comment from "../types/Comment";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const StyledThreadView: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([
        {
            body:
                "Any fool can write code that a computer can understand.\n" +
                "Good programmers write code that humans can understand.\n" +
                " ~ Martin Fowler",
            author: "Benedict",
            timestamp: new Date(2022, 10, 28, 10, 33, 30),
            key: 0,
        },
        {
            body: "Code reuse is the Holy Grail of Software Engineering.\n" + " ~ Douglas Crockford",
            author: "Casey",
            timestamp: new Date(2022, 11, 1, 11, 11, 11),
            key: 1,
        },
        {
            body: "Nine people can't make a baby in a month.\n" + " ~ Fred Brooks",
            author: "Duuet",
            timestamp: new Date(2022, 11, 2, 10, 30, 0),
            key: 2,
        },
    ]);

    const handleAddComment = (newComment: Comment) => {
        setComments([...comments, newComment]);
    };

    return (
        <div style={{ width: "80vw", margin: "auto" }}>
            <Link to="/">
                <Button variant="contained" color="secondary" style={{ margin: "10px 20px" }}>
                    {"Back to threads"}
                </Button>
            </Link>

            <Card>
                <CardContent>
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
                </CardContent>
            </Card>

            <BasicCommentList comments={comments} />
            <MakeComment onAddComment={handleAddComment} />
        </div>
    );
};

export default StyledThreadView;
