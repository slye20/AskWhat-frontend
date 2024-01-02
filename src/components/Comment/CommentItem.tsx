import CommentForm from "./CommentForm";
import Comment from "../../types/Comment";

import React, { FormEvent, useState } from "react";
import { Avatar, Box, Card, CardHeader, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

type Props = {
    comment_temp: Comment;
};
const CommentItem: React.FC<Props> = ({ comment_temp }) => {
    const [comment, setComment] = useState(comment_temp);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState("");
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleEdit = () => {
        setAnchorEl(null);
        setEdit(true);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        fetch(`http://localhost:3000/comments/${comment.id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.jwt}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ comment }),
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    window.location.reload();
                    setEdit(false);
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

    const handleDelete = () => {
        window.location.reload();
        fetch(`http://localhost:3000/comments/${comment.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.jwt}`,
            },
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    return;
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
        setAnchorEl(null);
    };

    const dateTimeObject = new Date(comment.created_at || new Date());
    return (
        <Card sx={{ marginBottom: 2, boxShadow: 1, p: 2 }}>
            {edit ? (
                <CommentForm
                    comment={comment}
                    error={error}
                    setError={setError}
                    setComment={setComment}
                    handleSubmit={handleSubmit}
                />
            ) : (
                <>
                    <CardHeader
                        sx={{ p: 0 }}
                        avatar={<Avatar>{comment.author ? comment.author[0] : "?"}</Avatar>}
                        action={
                            <>
                                {localStorage.getItem("username") === comment.author && (
                                    <IconButton
                                        id="basic-button"
                                        aria-controls={open ? "basic-menu" : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? "true" : undefined}
                                        onClick={handleClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                )}
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                    }}
                                >
                                    <MenuItem onClick={handleEdit}>Edit</MenuItem>
                                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                                </Menu>
                            </>
                        }
                        title={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="body2" sx={{ fontWeight: "600" }}>
                                    {comment.author}
                                </Typography>
                                <Typography variant="body2" sx={{ marginLeft: 2 }}>
                                    {"Posted on " + dateTimeObject.toLocaleString()}
                                </Typography>
                            </Box>
                        }
                        subheader={
                            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", textAlign: "left" }}>
                                {comment.content}
                            </Typography>
                        }
                    />
                    {error && <div style={{ color: "red", margin: "10px 0", whiteSpace: "pre-line" }}>{error}</div>}
                </>
            )}
        </Card>
    );
};

export default CommentItem;
