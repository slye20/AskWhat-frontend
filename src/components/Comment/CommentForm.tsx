import CustomButton from "../UI/CustomButton";
import CustomTextField from "../UI/CustomTextField";
import Comment from "../../types/Comment";
import React, { ChangeEvent, FC, FormEvent } from "react";

/**
 * Represents a card form for editing/creating a comment.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Comment} props.comment - The comment object to be edited or for reference in creating a new one.
 * @param {string} props.error - An error message to display (if any).
 * @param {function} props.setError - Function to set the error message.
 * @param {function} props.setComment - Function to update the comment state.
 * @param {function} props.handleSubmit - Function to handle form submission.
 * @returns {React.ReactElement} A React element representing a form for editing or creating a comment.
 */

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
