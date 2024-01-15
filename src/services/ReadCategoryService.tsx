import Thread from "../types/Thread";
import Category from "../types/Category";

/**
 * Sends a GET request to fetch a the category data and a list of its threads.
 *
 * This function sends a GET request to retrieve thread from the server.
 * It handles the server's response as follows:
 * - If the request is successful (200 OK), it parses and returns the JSON response, setting the category and threads data.
 * - In case of any network or server errors, it redirects to the home page.
 *
 * @param {string} categoryId - The category id used for filtering threads.
 * @param {function} setThreads - Function to set the threads data in the parent component.
 * @param {function} setCategory - Function to set the category data in the parent component.
 * @param {function} navigate - Function to navigate to different routes, used here for redirection to the home page in case of errors.
 */

const apiReadCategory = (
    categoryId: string,
    setThreads: (threads: Required<Thread>[]) => void,
    setCategory: (category: Category) => void,
    navigate: (route: string) => void,
) => {
    fetch(`http://localhost:3000/categories/${categoryId}`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then((res) => {
            console.log(res);
            setThreads(res.threads);
            setCategory(res.category);
        })
        .catch(() => navigate("/"));
};

export default apiReadCategory;
