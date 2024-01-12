import CommentForm from "./CommentForm";
import apiCreateComment from "../../services/CreateCommentService";
import useCommentHandler from "../../hooks/useCommentHandler";

import React from "react";
import { useParams } from "react-router-dom";

const MakeComment: React.FC = () => {
    const { threadId } = useParams();
    const initialComment = { content: "", id: Number(threadId) };
    const { comment, setComment, error, setError, handleSubmit } = useCommentHandler({
        initialComment: initialComment,
        saveComment: apiCreateComment,
    });
    return (
        <div style={{ margin: "auto", textAlign: "center" }}>
            <CommentForm
                comment={comment}
                error={error}
                setError={setError}
                setComment={setComment}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default MakeComment;
