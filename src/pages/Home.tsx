import apiReadAllThreads from "../services/ReadAllThreadsService";
import CustomButton from "../components/UI/CustomButton";
import Thread from "../types/Thread";
import ForumList from "../components/Forum/ForumList";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [threads, setThreads] = useState<Required<Thread>[]>([]);

    useEffect(() => {
        apiReadAllThreads(setThreads, navigate);
    }, []);

    return (
        <Box sx={{ width: "80vw", margin: "auto", bgcolor: "background.paper" }}>
            <ForumList threads={threads} />
            <CustomButton label="Show More" />
        </Box>
    );
};

export default Home;
