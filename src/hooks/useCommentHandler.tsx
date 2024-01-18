import Comment from "../types/Comment";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for managing comment state and handling submission logic.
 *
 * This hook initializes with an initial comment state and provides a mechanism to update this state.
 * It also handles the submission of the comment through a provided saveComment function.
 * Errors during submission are managed within the hook, and navigation can be performed after submission.
 *
 * @param {CommentHandlerProps} props - The properties required by the hook.
 * @param {Comment} props.initialComment - The initial state of the comment.
 * @param {function} props.saveComment - A api Function to save the comment. This function should handle the logic for creating or updating a comment.
 * @returns {{ comment, setComment, error, setError, handleSubmit }} - An object containing the comment state, functions to update and submit the comment, and any error messages.
 */

type CommentHandlerProps = {
    initialComment: Comment;
    saveComment: (
        comment: Comment,
        setErrors: (error: string) => void,
        navigate: (route: string) => void,
        handleNewComment?: (comment: Required<Comment>) => void,
    ) => void;
    handleNewComment?: (comment: Required<Comment>) => void;
};

const useCommentHandler = ({ initialComment, saveComment, handleNewComment }: CommentHandlerProps) => {
    const [comment, setComment] = useState<Comment>(initialComment);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (handleNewComment) {
            saveComment(comment, setError, navigate, handleNewComment);
        } else {
            saveComment(comment, setError, navigate);
        }
    };

    return { comment, setComment, error, setError, handleSubmit };
};

export default useCommentHandler;
