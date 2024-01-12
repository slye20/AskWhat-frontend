import ThreadData from "../types/ThreadData";
import apiReadThread from "../services/ReadThreadService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useThreadData = (threadId: string) => {
    const navigate = useNavigate();
    const [result, setResult] = useState<ThreadData>({
        thread: undefined,
        comments: [],
    });

    useEffect(() => {
        apiReadThread(threadId as string, setResult, navigate);
    }, []);
    return { result, navigate };
};

export default useThreadData;
