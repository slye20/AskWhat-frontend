import Thread from "../types/Thread";

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