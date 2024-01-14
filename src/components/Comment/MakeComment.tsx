import CommentForm from "./CommentForm";
import Comment from "../../types/Comment";
import apiCreateComment from "../../services/CreateCommentService";
import useCommentHandler from "../../hooks/useCommentHandler";

import React, { FormEvent } from "react";
import { useParams } from "react-router-dom";

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
