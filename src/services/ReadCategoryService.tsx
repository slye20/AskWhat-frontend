import Thread from "../types/Thread";
import Category from "../types/Category";

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
