import Thread from "../types/Thread";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for managing thread state and handling submission logic.
 *
 * This hook initializes with an initial thread state and provides a mechanism to update this state.
 * It also handles the submission of the thread through a provided saveThread function.
 * Errors during submission are managed within the hook, and navigation can be performed after submission.
 *
 * @param {ForumHandlerProps} props - The properties required by the hook.
 * @param {Thread} props.initialThread - The initial state of the thread.
 * @param {function} props.saveThread - A api Function to save the thread. This function should handle the logic for creating or updating a thread.
 * @returns {{ thread, setThread, error, setError, handleSubmit }} - An object containing the thread state, functions to update and submit the thread, and any error messages.
 */

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
