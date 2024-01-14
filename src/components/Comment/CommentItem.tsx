import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import apiUpdateComment from "../../services/UpdateCommentService";
import Comment from "../../types/Comment";
import useCommentHandler from "../../hooks/useCommentHandler";

import React, { useState } from "react";
import { Card } from "@mui/material";

type Props = {
    data: Comment;
};

const CommentItem: React.FC<Props> = ({ data }) => {
    const { comment, setComment, error, setError, handleSubmit } = useCommentHandler({
        initialComment: data,
        saveComment: apiUpdateComment,
    });
    const [edit, setEdit] = useState(false);

    return (
        <Card sx={{ marginBottom: 2, boxShadow: 1, p: 2 }}>
            {edit ? (
                <CommentForm
                    comment={comment}
                    error={error}
                    setError={setError}
                    setComment={setComment}
                    handleSubmit={(event) => {
                        setEdit(false);
                        handleSubmit(event);
                    }}
                />
            ) : (
                <CommentCard comment={comment} error={error} setError={setError} setEdit={setEdit} />
            )}
        </Card>
    );
};

export default CommentItem;
