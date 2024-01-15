/**
 * Sends a POST request to sign up.
 *
 * This function sends a POST request to the server to sign up into the forum. It handles different response statuses:
 * - If the request is successful (200 OK), it adds the jwt key and username into localStorage and redirects to home page.
 * - If the request is not acceptable (406), it throws an error with the server's error message.
 * - For other errors, it throws a generic error message.
 *
 * @param {{ username: string; password: string }} user - The thread object to be destroyed.
 * @param {function} setErrors - Function to set error messages in the parent component.
 * @param {function} navigate - Function to navigate to different routes (e.g., for redirection to the home page).
 */
const apiSignUp = (
    user: { username: string; email: string; password: string },
    setErrors: (error: string) => void,
    navigate: (route: string) => void,
) => {
    fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
        credentials: "include",
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 406) {
                // 406 not acceptable
                return res.json().then((err) => {
                    throw new Error(err.error.join("\n"));
                });
            } else {
                throw new Error("An error occurred. Please try again later.");
            }
        })
        .then((data) => {
            localStorage.setItem("jwt", data.jwt);
            localStorage.setItem("username", user.username);
            navigate(`/`);
        })
        .catch((error) => setErrors(error.message));
};

export default apiSignUp;
