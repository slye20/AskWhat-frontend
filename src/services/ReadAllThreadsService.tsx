import Thread from "../types/Thread";
const apiReadAllThreads = (
    query: string,
    setThreads: (threads: Required<Thread>[]) => void,
    navigate: (route: string) => void,
) => {
    fetch(`http://localhost:3000/search?q=${query}`)
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
