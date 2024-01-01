import Thread from "../types/Thread";
import { Box, Card, CardContent, CardHeader, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type Prop = {
    thread?: Thread;
};

const MainPost: React.FC<Prop> = ({ thread }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dateTimeObject = thread ? new Date(thread.created_at) : new Date();

    return (
        <Card variant="outlined" sx={{ marginBottom: 2, boxShadow: 1 }}>
            <CardHeader
                action={
                    // Menu only shows if username match author's name
                    <>
                        {localStorage.getItem("username") === thread?.author && (
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
                            <MenuItem onClick={handleClose}>Edit</MenuItem>
                            <MenuItem onClick={handleClose}>Delete</MenuItem>
                        </Menu>
                    </>
                }
                title={
                    <Typography variant="h5" sx={{ textAlign: "left" }}>
                        {thread?.title}
                    </Typography>
                }
                subheader={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body2" sx={{ fontWeight: "600" }}>
                            {thread?.author}
                        </Typography>
                        <Typography variant="body2" sx={{ marginLeft: 2 }}>
                            {"Posted on " + dateTimeObject.toLocaleString()}
                        </Typography>
                    </Box>
                }
            />
            <CardContent sx={{ py: 0 }}>
                <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", textAlign: "left" }}>
                    {thread?.content}
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
        </Card>
    );
};

export default MainPost;
