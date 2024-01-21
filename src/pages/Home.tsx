import apiReadAllThreads from "../services/ReadAllThreadsService";
import CustomButton from "../components/UI/CustomButton";
import Thread from "../types/Thread";
import ForumList from "../components/Forum/ForumList";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";

/**
 * This component fetches and displays a list of all threads from the forum. It supports filtering of threads based on a query parameter.
 * The list of threads is fetched using the `apiReadAllThreads` service, which takes the query parameter to filter threads.
 * It renders the fetched threads using the `ForumList` component.
 * The component also includes a 'Show More' button for future pagination or loading more threads.
 *
 * @component
 * @returns {React.ReactElement} A React element representing the home page of the forum, displaying a list of threads.
 */

const Home: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const navigate = useNavigate();
    const [threads, setThreads] = useState<Required<Thread>[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiReadAllThreads(query, setThreads, navigate, setIsLoading);
    }, [query]);

    if (isLoading) {
        // Render a loading indicator
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ width: "80vw", margin: "auto", bgcolor: "background.paper" }}>
            <ForumList threads={threads} />
            <CustomButton label="Show More" disabled />
        </Box>
    );
};

export default Home;
