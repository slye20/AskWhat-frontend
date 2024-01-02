import Thread from "../../types/Thread";
import { Box, CardContent, CardHeader, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { FC, useState } from "react";

type Prop = {
    thread: Thread;
    handleEdit: () => void;
    handleDelete: () => void;
};

const MainPostCard: FC<Prop> = ({ thread, handleEdit, handleDelete }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const dateTimeObject = thread?.created_at ? new Date(thread.created_at) : new Date();
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
                            onClose={() => setAnchorEl(null)}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem
                                onClick={() => {
                                    setAnchorEl(null);
                                    handleEdit();
                                }}
                            >
                                Edit
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setAnchorEl(null);
                                    handleDelete();
                                }}
                            >
                                Delete
                            </MenuItem>
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
        </>
    );
};

export default MainPostCard;
