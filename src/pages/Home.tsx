import ForumList from "../components/ForumList";
import React from "react";
import { Button, Typography } from "@mui/material";

const Home: React.FC = () => {
    const threads = [
        {
            id: 101,
            title: "Welcome to Our Community Forum",
            description: "This is a space for community discussions, questions, and sharing your experiences.",
            createdAt: new Date("2023-12-01T09:00:00"),
            author: "Tom",
        },
        {
            id: 102,
            title: "Tips for Effective Online Learning",
            description: "Share and learn tips about how to make the most out of online courses.",
            createdAt: new Date("2023-12-19T15:30:00"),
            author: "Dick",
        },
        {
            id: 103,
            title: "Upcoming Webinar on Web Development",
            description: "Join us for a webinar on the latest trends in web development. Open for all skill levels.",
            createdAt: new Date("2023-12-10T11:00:00"),
            author: "Harry",
        },
    ];
    return (
        <>
            <Typography variant="h5" component="h5" marginTop={2}>
                {"Threads"}
            </Typography>
            <Button color="secondary" variant="contained" style={{ marginTop: "10px" }}>
                New Thread
            </Button>
            <ForumList threads={threads} />
            <Button color="secondary" variant="contained" style={{ margin: "10px 20px" }}>
                Show More
            </Button>
        </>
    );
};

export default Home;
