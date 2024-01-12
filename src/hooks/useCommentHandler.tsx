import Comment from "../types/Comment";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type CommentHandlerProps = {
    initialComment: Comment;
    saveComment: (comment: Comment, setErrors: (error: string) => void, navigate: (route: string) => void) => void;
};

const useCommentHandler = ({ initialComment, saveComment }: CommentHandlerProps) => {
    const [comment, setComment] = useState<Comment>(initialComment);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        saveComment(comment, setError, navigate);
    };

    return { comment, setComment, error, setError, handleSubmit };
};

export default useCommentHandler;
