const apiDeleteThread = (threadId: string, setErrors: (error: string) => void, navigate: (route: string) => void) => {
    fetch(`http://localhost:3000/forum_threads/${threadId}`, {
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
