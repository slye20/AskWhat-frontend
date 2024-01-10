const apiLogin = (
    user: { username: string; password: string },
    setErrors: (error: string) => void,
    navigate: (route: string) => void,
) => {
    fetch("http://localhost:3000/login", {
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
            } else if (res.status === 401) {
                // Handle 401 Unauthorized response
                throw new Error("Invalid username or password");
            } else if (res.status === 422) {
                // 406 unprocessable_entity
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

export default apiLogin;
