import CommentForm from "./CommentForm";

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MakeComment: React.FC = () => {
    const { threadId } = useParams();
    const [comment, setComment] = useState({ content: "", id: Number(threadId) });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        fetch(`http://localhost:3000/comments`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.jwt}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ comment }),
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else if (res.status === 401) {
                    // 401 unauthorized
                    navigate("/login");
                } else if (res.status === 406 || res.status === 422) {
                    // 406 not acceptable
                    return res.json().then((err) => {
                        console.log(err);
                        throw new Error(err.error.join("\n"));
                    });
                } else {
                    throw new Error("An error occurred. Please try again later.");
                }
            })
            .catch((error) => setError(error.message));
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
