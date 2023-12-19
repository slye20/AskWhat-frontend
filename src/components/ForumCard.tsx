import Forum from "../types/Forum";
import { ListItemAvatar, ListItemText, ListItemButton, Avatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    thread: Forum;
};

const ForumCard: React.FC<Props> = ({ thread }) => {
    const navigate = useNavigate();
    return (
        <ListItemButton
            onClick={() => navigate("/thread")}
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
            <ListItemText primary={thread.title} secondary={thread.description} />
            <ListItemText primary={thread.createdAt.toLocaleString()} />
        </ListItemButton>
    );
};

export default ForumCard;
