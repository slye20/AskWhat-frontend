import Forum from "../types/Forum";
import { ListItemAvatar, ListItemText, ListItemButton, Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

type Props = {
    thread: Forum;
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
                borderColor: "orange",
                padding: 3,
                margin: 1,
                bgcolor: "background.paper",
            }}
        >
            <ListItemAvatar>
                <Avatar></Avatar>
            </ListItemAvatar>
            <Box>
                <ListItemText primary={thread.title} secondary={thread.description} />
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                    <Typography sx={{ fontSize: "10px", marginX: 1, paddingX: 1, bgcolor: "lightgray" }}>
                        {thread.author}
                    </Typography>
                    <Typography sx={{ fontSize: "10px", marginX: 1, paddingX: 1, bgcolor: "lightgray" }}>
                        {dayjs(thread.createdAt).fromNow()}
                    </Typography>
                </Box>
            </Box>
        </ListItemButton>
    );
};

export default ForumCard;
