import Thread from "../types/Thread";

/**
 * Sends a GET request to fetch a list of threads from the server based on a query parameter.
 *
 * This function sends a GET request to retrieve threads from the server. The response is filtered based on the provided query string.
 * It handles the server's response as follows:
 * - If the request is successful (200 OK), it parses and returns the JSON response, setting the threads data.
 * - In case of any network or server errors, it redirects to the home page.
 *
 * @param {string} query - The query string used for filtering threads.
 * @param {function} setThreads - Function to set the threads data in the parent component.
 * @param {function} navigate - Function to navigate to different routes, used here for redirection to the home page in case of errors.
 */

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
