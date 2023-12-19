import Comment from "../types/Comment";

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

type Props = {
    comment: Comment;
};
const CommentItem: React.FC<Props> = ({ comment }) => {
    return (
        <Card sx={{ marginBottom: "1em" }}>
            <CardContent>
                <Typography
                    variant="body2"
                    color="textPrimary"
                    sx={{ fontSize: 16, whiteSpace: "pre-wrap", paddingBottom: "1em", textAlign: "center" }}
                >
                    {comment.body}
                </Typography>
                <Typography color="textSecondary" sx={{ fontSize: 14 }} gutterBottom>
                    {"Posted by " + comment.author + " on " + comment.timestamp.toLocaleString()}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CommentItem;
