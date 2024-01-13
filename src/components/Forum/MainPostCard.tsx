import Thread from "../../types/Thread";
import useMenu from "../../hooks/useMenu";
import { Box, CardContent, CardHeader, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { FC } from "react";

type Prop = {
    thread: Thread;
    error: string;
    setError: (value: string) => void;
    setEdit: (bool: boolean) => void;
};

const MainPostCard: FC<Prop> = ({ thread, error, setError, setEdit }) => {
    const { open, anchorEl, handleClick, handleEdit, handleClose, handleDelete } = useMenu(thread, setError, setEdit);
    const dateTimeObject = thread?.created_at ? new Date(thread?.created_at) : "Error: Cannot load date";

    return (
        <>
            <CardHeader
                action={
                    // Menu only shows if username match author's name
                    <>
                        {localStorage.getItem("username") === thread.author && (
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
                            keepMounted
                        >
                            <MenuItem onClick={handleEdit}>Edit</MenuItem>
                            <MenuItem onClick={handleDelete}>Delete</MenuItem>
                        </Menu>
                    </>
                }
                title={
                    <Typography variant="h5" sx={{ textAlign: "left" }}>
                        {thread.title}
                    </Typography>
                }
                subheader={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body2" sx={{ fontWeight: "600" }}>
                            {thread.author}
                        </Typography>
                        <Typography variant="body2" sx={{ marginLeft: 2 }}>
                            {"Posted on " + dateTimeObject.toLocaleString()}
                        </Typography>
                    </Box>
                }
            />
            <CardContent sx={{ py: 0 }}>
                <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", textAlign: "left" }}>
                    {thread.content}
                </Typography>
            </CardContent>
            <CardContent sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                {thread?.categories.map((category, index) => (
                    <Typography
                        key={index}
                        variant="body2"
                        sx={{ marginRight: 2, bgcolor: "secondary.light", px: 1, borderRadius: 1 }}
                    >
                        {category}
                    </Typography>
                ))}
            </CardContent>
            {error && <div style={{ color: "red", margin: "10px 0", whiteSpace: "pre-line" }}>{error}</div>}
        </>
    );
};

export default MainPostCard;
