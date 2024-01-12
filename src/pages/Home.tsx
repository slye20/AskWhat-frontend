import apiReadAllThreads from "../services/ReadAllThreadsService";
import CustomButton from "../components/ui/CustomButton";
import Thread from "../types/Thread";
import ForumList from "../components/Forum/ForumList";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [threads, setThreads] = useState<Required<Thread>[]>([]);

    useEffect(() => {
        apiReadAllThreads(setThreads, navigate);
    }, []);

    return (
        <>
            <ForumList threads={threads} />
            <CustomButton label="Show More" />
        </>
    );
};

export default Home;
