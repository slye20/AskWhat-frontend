import Thread from "../types/Thread";
import { ListItemAvatar, ListItemText, ListItemButton, Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type Props = {
    thread: Thread;
};

const ForumCard: React.FC<Props> = ({ thread }) => {
    const navigate = useNavigate();
    dayjs.extend(relativeTime);
    return (
        <ListItemButton
            onClick={() => navigate(`/thread/${thread.id}`)}
            sx={{
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "primary.main",
                padding: 2,
                margin: 1,
                bgcolor: "background.paper",
                "&:hover": {
                    bgcolor: "background.default",
                    boxShadow: 2,
                },
            }}
        >
            <ListItemAvatar>
                <Avatar>{thread.author[0].toUpperCase()}</Avatar>
            </ListItemAvatar>
            <Box>
                <ListItemText primary={thread.title} secondary={thread.description} />
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                    <Typography variant="caption" sx={{ bgcolor: "secondary.light", px: 1, borderRadius: 1 }}>
                        {thread.author}
                    </Typography>
                    <Typography variant="caption" sx={{ ml: 1, bgcolor: "secondary.light", px: 1, borderRadius: 1 }}>
                        {dayjs(thread.createdAt).fromNow()}
                    </Typography>
                </Box>
            </Box>
        </ListItemButton>
    );
};

export default ForumCard;
