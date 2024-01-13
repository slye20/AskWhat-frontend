import Comment from "../../types/Comment";
import useMenu from "../../hooks/useMenu";

import { Avatar, Box, CardHeader, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";

type Prop = {
    comment: Comment;
    error: string;
    setError: (value: string) => void;
    setEdit: (bool: boolean) => void;
};

const CommentCard: React.FC<Prop> = ({ comment, error, setError, setEdit }) => {
    const { open, anchorEl, handleClick, handleEdit, handleClose, handleDelete } = useMenu(comment, setError, setEdit);
    const dateTimeObject = comment?.created_at ? new Date(comment?.created_at) : "Error: Cannot load date";

    return (
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
    );
};

export default CommentCard;
