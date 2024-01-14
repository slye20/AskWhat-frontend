import Comment from "../types/Comment";
import Thread from "../types/Thread";
import apiReadThread from "../services/ReadThreadService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useThreadData = (threadId: string) => {
    const navigate = useNavigate();
    const [thread, setThread] = useState<Thread>({ title: "", content: "", categories: [] });
    const [comments, setComments] = useState<Required<Comment>[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiReadThread(threadId as string, setThread, setComments, navigate, setIsLoading);
    }, []);

    const handleNewComment = (newComment: Required<Comment>) => {
        setComments([...comments, newComment]);
    };

    return { thread, comments, handleNewComment, navigate, isLoading };
};

export default useThreadData;
