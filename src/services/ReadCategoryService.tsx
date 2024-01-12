const apiReadCategory = (setCategories: (categories: string[]) => void) => {
    fetch(`http://localhost:3000/categories`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then((t) => setCategories(t));
    // .catch(() => navigate("/"));
};

export default apiReadCategory;
