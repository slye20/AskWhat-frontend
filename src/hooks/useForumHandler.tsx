import Thread from "../types/Thread";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

type ForumHandlerProps = {
    initialThread: Thread;
    saveThread: (thread: Thread, setErrors: (error: string) => void, navigate: (route: string) => void) => void;
};

const useForumHandler = ({ initialThread, saveThread }: ForumHandlerProps) => {
    const [thread, setThread] = useState<Thread>(initialThread);
    const [error, setError] = useState(""); // error if content is empty
    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        saveThread(thread, setError, navigate);
    };

    return { thread, setThread, error, setError, handleSubmit };
};

export default useForumHandler;
