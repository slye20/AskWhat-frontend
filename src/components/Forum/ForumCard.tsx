import Thread from "../../types/Thread";
import { ListItemAvatar, ListItemText, ListItemButton, Avatar, Typography, Grid, Button, Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

/**
 * Represents a card component for displaying a thread.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Required<Thread>} props.thread - The thread object to be displayed.
 * @returns {React.ReactElement} A React element representing a forum thread card.
 */

type Props = {
    thread: Required<Thread>;
};

const ForumCard: React.FC<Props> = ({ thread }) => {
    const navigate = useNavigate();
    const dateTimeObject = new Date(thread.created_at);

    return (
        <ListItemButton
            onClick={() => navigate(`/thread/${thread.id}`)}
            sx={{
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "primary.main",
                margin: 1,
                bgcolor: "background.paper",
                "&:hover": {
                    bgcolor: "background.default",
                    boxShadow: 5,
                },
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm container spacing={1}>
                    <Grid item xs container direction="column" spacing={1}>
                        <Grid item xs>
                            <ListItemAvatar sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <Avatar sx={{ width: 20, height: 20, fontSize: "0.75rem" }}>
                                    {thread.author[0].toUpperCase()}
                                </Avatar>
                                <Typography variant="caption" sx={{ fontSize: "0.75rem", marginLeft: 1 }}>
                                    {thread.author}
                                </Typography>
                            </ListItemAvatar>
                            <ListItemText primary={thread.title} secondary={thread.content} />
                        </Grid>
                        <Grid item>
                            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", p: 0 }}>
                                {thread?.categories.map((category, index) => (
                                    <Typography
                                        key={index}
                                        variant="body2"
                                        sx={{ marginRight: 2, bgcolor: "lightgrey", px: 1, borderRadius: 1 }}
                                    >
                                        {category}
                                    </Typography>
                                ))}
                            </Box>
                        </Grid>
                        <Grid item>
                            <Button disabled startIcon={<FavoriteBorderIcon />}>
                                0
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption" component="div">
                            {dateTimeObject.toLocaleString()}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </ListItemButton>
    );
};

export default ForumCard;
