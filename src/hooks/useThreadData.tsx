import Comment from "../types/Comment";
import Thread from "../types/Thread";
import apiReadThread from "../services/ReadThreadService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * Custom hook for fetching and managing data of a specific forum thread.
 *
 * This hook is responsible for fetching data for a particular thread using its ID.
 * It manages the state of the thread and its associated comments, handles the addition of new comments,
 * and tracks the loading state of the data. The hook also handles navigation if needed.
 *
 * @param {string} threadId - The unique identifier for the thread.
 * @returns {{ thread, comments, handleNewComment, navigate, isLoading }} - An object containing the thread data,
 * comments, a handler for new comments, a navigate function, and a loading state indicator.
 */

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
