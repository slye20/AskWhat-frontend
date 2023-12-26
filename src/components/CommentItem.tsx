import Comment from "../types/Comment";

import React from "react";
import { Avatar, Box, Card, CardContent, Divider, Typography } from "@mui/material";

type Props = {
    comment: Comment;
};
const CommentItem: React.FC<Props> = ({ comment }) => {
    const dateTimeObject = new Date(comment.created_at);
    return (
        <Card sx={{ marginBottom: 2, boxShadow: 1 }}>
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                    <Avatar sx={{ marginRight: 1 }}>{comment.author[0]}</Avatar>
                    <Typography variant="subtitle2" color="textSecondary">
                        {comment.author}
                    </Typography>
                </Box>
                <Typography
                    variant="body2"
                    color="textPrimary"
                    sx={{ fontSize: 16, whiteSpace: "pre-wrap", paddingBottom: "1em", textAlign: "left" }}
                >
                    {comment.content}
                </Typography>
                <Divider />
                <Typography variant="caption" color="textSecondary">
                    {"Posted " + dateTimeObject.toLocaleString()}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CommentItem;
