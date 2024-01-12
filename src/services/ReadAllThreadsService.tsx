import Thread from "../types/Thread";
const apiReadAllThreads = (setThreads: (threads: Required<Thread>[]) => void, navigate: (route: string) => void) => {
    fetch("http://localhost:3000/forum_threads")
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then((t) => setThreads(t))
        .catch(() => navigate("/"));
};

export default apiReadAllThreads;
