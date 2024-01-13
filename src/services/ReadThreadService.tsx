import ThreadData from "../types/ThreadData";

const apiReadThread = (
    threadId: string,
    setResult: (result: ThreadData) => void,
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
            setResult(res);
            setIsLoading(false);
        })
        .catch(() => navigate("/"));
};

export default apiReadThread;
