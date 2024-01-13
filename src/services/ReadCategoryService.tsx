import CategoryData from "../types/CategoryData";

const apiReadCategory = (
    categoryId: string,
    setData: (data: CategoryData) => void,
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
            setData(res);
        })
        .catch(() => navigate("/"));
};

export default apiReadCategory;
