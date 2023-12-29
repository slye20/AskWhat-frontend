import ForumList from "../components/ForumList";
import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        const url = "http://localhost:3000/forum_threads";
        fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.jwt}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((t) => setThreads(t))
            .catch(() => navigate("/"));
    }, []);

    return (
        <>
            <Button
                color="secondary"
                variant="contained"
                style={{ marginTop: "10px" }}
                onClick={() => localStorage.removeItem("jwt")} // to log out
            >
                Sign Out
            </Button>
            <Typography variant="h5" component="h5" marginTop={2}>
                {"Threads"}
            </Typography>
            <Link to="/submit">
                <Button color="secondary" variant="contained" style={{ marginTop: "10px" }}>
                    New Thread
                </Button>
            </Link>
            <ForumList threads={threads} />
            <Button color="secondary" variant="contained" style={{ margin: "10px 20px" }}>
                Show More
            </Button>
        </>
    );
};

export default Home;
