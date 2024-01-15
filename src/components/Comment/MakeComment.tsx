import CommentForm from "./CommentForm";
import Comment from "../../types/Comment";
import apiCreateComment from "../../services/CreateCommentService";
import useCommentHandler from "../../hooks/useCommentHandler";

import React, { FormEvent } from "react";
import { useParams } from "react-router-dom";

/**
 * Represents a component for creating a new comment.
 *
 * This component renders a form for users to input and submit a new comment. It uses the `useCommentHandler` hook
 * for managing the comment's state and handling the submission process. The `threadId` is retrieved from the URL
 * parameters to associate the comment with a specific thread.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {function} props.handleNewComment - Function to handle the addition of a new comment to the list.
 * @returns {React.ReactElement} A React element representing a form for creating a new comment.
 */

type MakeCommentProps = {
    handleNewComment: (comment: Required<Comment>) => void;
};

const MakeComment: React.FC<MakeCommentProps> = ({ handleNewComment }) => {
    const { threadId } = useParams();
    const initialComment = { content: "", id: Number(threadId) };
    const { comment, setComment, error, setError, handleSubmit } = useCommentHandler({
        initialComment: initialComment,
        saveComment: apiCreateComment,
    });

    const onSubmit = (event: FormEvent) => {
        handleSubmit(event);
        handleNewComment({ ...comment, author: localStorage.getItem("username") as string, created_at: new Date() });
        setComment(initialComment);
    };

    return (
        <div style={{ margin: "auto", textAlign: "center" }}>
            <CommentForm
                comment={comment}
                error={error}
                setError={setError}
                setComment={setComment}
                handleSubmit={onSubmit}
            />
        </div>
    );
};

export default MakeComment;
