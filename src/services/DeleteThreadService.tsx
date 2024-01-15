import Thread from "../types/Thread";

/**
 * Sends a DELETE request to delete a thread.
 *
 * This function sends a DELETE request to the server to delete a thread in the forum. It handles different response statuses:
 * - If the request is successful (200 OK), it returns and redirects to home page.
 * - If the user is unauthorized (401), it redirects to the login page.
 * - If the request is not acceptable (406) or unprocessable (422), it throws an error with the server's error message.
 * - For other errors, it throws a generic error message.
 *
 * @param {Thread} thread - The thread object to be destroyed.
 * @param {function} setErrors - Function to set error messages in the parent component.
 * @param {function} navigate - Function to navigate to different routes (e.g., for redirection to the login page).
 */

const apiDeleteThread = (thread: Thread, setErrors: (error: string) => void, navigate: (route: string) => void) => {
    fetch(`http://localhost:3000/forum_threads/${thread.id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.jwt}`,
        },
        credentials: "include",
    })
        .then((res) => {
            if (res.ok) {
                navigate("/");
            } else if (res.status === 401) {
                // 401 unauthorized
                navigate("/login");
            } else if (res.status === 406 || res.status === 422) {
                // 406 not acceptable
                return res.json().then((err) => {
                    console.log(err);
                    throw new Error(err.error.join("\n"));
                });
            } else {
                throw new Error("An error occurred. Please try again later.");
            }
        })
        .catch((error) => setErrors(error.message));
};

export default apiDeleteThread;
