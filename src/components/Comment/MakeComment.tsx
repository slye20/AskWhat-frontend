import CommentForm from "./CommentForm";
import apiCreateComment from "../../services/CreateCommentService";

import React, { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MakeComment: React.FC = () => {
    const { threadId } = useParams();
    const [comment, setComment] = useState({ content: "", id: Number(threadId) });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        apiCreateComment(comment, setError, navigate);
    };

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
