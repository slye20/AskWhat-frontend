import Comment from "../types/Comment";

import React from "react";
import { Avatar, Box, Card, CardHeader, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type Props = {
    comment: Comment;
};
const CommentItem: React.FC<Props> = ({ comment }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dateTimeObject = new Date(comment.created_at);
    return (
        <Card sx={{ marginBottom: 2, boxShadow: 1, p: 2 }}>
            <CardHeader
                sx={{ p: 0 }}
                avatar={<Avatar>{comment.author[0]}</Avatar>}
                action={
                    <>
                        <IconButton
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem onClick={handleClose}>Edit</MenuItem>
                            <MenuItem onClick={handleClose}>Delete</MenuItem>
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
        </Card>
    );
};

export default CommentItem;
