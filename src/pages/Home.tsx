import Thread from "../types/Thread";
import ForumList from "../components/Forum/ForumList";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [threads, setThreads] = useState<Required<Thread>[]>([]);

    useEffect(() => {
        const url = "http://localhost:3000/forum_threads";
        fetch(url)
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
            <ForumList threads={threads} />
            <Button color="secondary" variant="contained" style={{ margin: "10px 20px" }}>
                Show More
            </Button>
        </>
    );
};

export default Home;
