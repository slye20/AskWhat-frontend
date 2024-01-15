import Thread from "../types/Thread";

/**
 * Sends a PATCH request to update a thread.
 *
 * This function sends a PATCH request to the server to update a thread in the forum. It handles different response statuses:
 * - If the request is successful (200 OK), it parses and returns the JSON response.
 * - If the user is unauthorized (401), it redirects to the login page.
 * - If the request is not acceptable (406) or unprocessable (422), it throws an error with the server's error message.
 * - For other errors, it throws a generic error message.
 *
 * @param {Thread} thread - The thread object to be created.
 * @param {function} setErrors - Function to set error messages in the parent component.
 * @param {function} navigate - Function to navigate to different routes (e.g., for redirection to the login page).
 */

const apiUpdateThread = (thread: Thread, setErrors: (error: string) => void, navigate: (route: string) => void) => {
    fetch(`http://localhost:3000/forum_threads/${thread.id}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.jwt}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ thread }),
        credentials: "include",
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
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

export default apiUpdateThread;
