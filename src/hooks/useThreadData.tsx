import ThreadData from "../types/ThreadData";
import apiReadThread from "../services/ReadThreadService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useThreadData = (threadId: string) => {
    const navigate = useNavigate();
    const [result, setResult] = useState<ThreadData>({
        thread: { title: "", content: "", categories: [] },
        comments: [],
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiReadThread(threadId as string, setResult, navigate, setIsLoading);
    }, []);
    return { result, navigate, isLoading };
};

export default useThreadData;
