import Comment from "../types/Comment";
import { API_URL } from "../constants/constants";

/**
 * Sends a POST request to create a new comment.
 *
 * This function sends a POST request to the server to create a new comment in the forum. It handles different response statuses:
 * - If the request is successful (200 OK), it parses and returns the JSON response.
 * - If the user is unauthorized (401), it redirects to the login page.
 * - If the request is not acceptable (406) or unprocessable (422), it throws an error with the server's error message.
 * - For other errors, it throws a generic error message.
 *
 * @param {Comment} comment - The comment object to be created.
 * @param {function} setErrors - Function to set error messages in the parent component.
 * @param {function} navigate - Function to navigate to different routes (e.g., for redirection to the login page).
 * @param {function} handleNewComment - Optional. Function to handle the new comment data after a successful creation.
 *                                      It takes a comment object of type Required<Comment> as an argument.
 */

const apiCreateComment = (
    comment: Comment,
    setErrors: (error: string) => void,
    navigate: (route: string) => void,
    handleNewComment?: (comment: Required<Comment>) => void,
) => {
    fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.jwt}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
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
        .then((res) => {
            if (handleNewComment) {
                console.log(res.comment);
                handleNewComment({
                    ...comment,
                    author: String(localStorage.getItem("username")),
                    created_at: new Date(),
                    id: res.comment.id,
                });
            }
        })
        .catch((error) => setErrors(error.message));
};

export default apiCreateComment;
