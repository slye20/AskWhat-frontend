import Comment from "../../types/Comment";
import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, FC, FormEvent } from "react";

type Prop = {
    comment: Comment;
    error: string;
    setError: (value: string) => void;
    setComment: (comment: Comment) => void;
    handleSubmit: (event: FormEvent) => void;
};

const CommentForm: FC<Prop> = ({ comment, error, setError, setComment, handleSubmit }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setComment({ ...comment, content: event.target.value });
        setError("");
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                onChange={handleChange}
                label="Comment"
                multiline
                rows={2}
                placeholder="Share your thoughts!"
                fullWidth={true}
                size="small"
                value={comment.content}
            />
            <br />
            {error && <div style={{ color: "red", margin: "10px 0", whiteSpace: "pre-line" }}>{error}</div>}
            <Button color="warning" variant="contained" type="submit" style={{ margin: "10px 20px" }}>
                post
            </Button>
        </form>
    );
};

export default CommentForm;
