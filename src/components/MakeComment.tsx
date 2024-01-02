import "../App.css";

import React, { ChangeEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const MakeComment: React.FC = () => {
    const { threadId } = useParams();
    const [comment, setComment] = useState({ content: "", id: threadId });
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

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setComment({ ...comment, content: event.target.value });
    };

    return (
        <div style={{ margin: "auto", textAlign: "center" }}>
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
        </div>
    );
};

export default MakeComment;
