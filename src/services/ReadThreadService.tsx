import Comment from "../types/Comment";
import Thread from "../types/Thread";

/**
 * Sends a GET request to fetch a the thread data and a list of its comments.
 *
 * This function sends a GET request to retrieve thread from the server.
 * It handles the server's response as follows:
 * - If the request is successful (200 OK), it parses and returns the JSON response, setting the threads and comments data.
 * - In case of any network or server errors, it redirects to the home page.
 *
 * @param {string} threadId - The thread id used for filtering threads.
 * @param {function} setThreads - Function to set the threads data in the parent component.
 * @param {function} setComments - Function to set the comments data in the parent component.
 * @param {function} navigate - Function to navigate to different routes, used here for redirection to the home page in case of errors.
 * @param {function} setIsLoading - Function to set loading status in the parent component.
 */

const apiReadThread = (
    threadId: string,
    setThread: (thread: Thread) => void,
    setComments: (comment: Required<Comment>[]) => void,
    navigate: (route: string) => void,
    setIsLoading: (loading: boolean) => void,
) => {
    fetch(`http://localhost:3000/forum_threads/${threadId}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then((res) => {
            setThread(res.thread);
            setComments(res.comments);
            setIsLoading(false);
        })
        .catch(() => navigate("/"));
};

export default apiReadThread;
