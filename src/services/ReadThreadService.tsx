import Comment from "../types/Comment";
import Thread from "../types/Thread";

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
