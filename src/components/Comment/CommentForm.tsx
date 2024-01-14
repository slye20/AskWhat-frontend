import CustomButton from "../UI/CustomButton";
import CustomTextField from "../UI/CustomTextField";
import Comment from "../../types/Comment";
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
        <form onSubmit={(event) => handleSubmit(event)}>
            <CustomTextField
                onChange={handleChange}
                label="Comment"
                placeholder="Share your thoughts!"
                value={comment.content}
                sx={{ m: 0 }}
                minRows={2}
            />
            <br />
            {error && <div style={{ color: "red", margin: "10px 0", whiteSpace: "pre-line" }}>{error}</div>}
            <CustomButton label="Post" type="submit" />
        </form>
    );
};

export default CommentForm;
