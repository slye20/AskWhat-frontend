import Category from "../types/Category";

/**
 * Sends a GET request to fetch a list of categories.
 *
 * This function sends a GET request to retrieve thread from the server.
 * It handles the server's response as follows:
 * - If the request is successful (200 OK), it parses and returns the JSON response, setting the threads and comments data.
 *
 * @param {function} setCategories - Function to set categories data in the parent component.
 */

const apiReadCategoryList = (setCategories: (categories: Category[]) => void) => {
    fetch(`http://localhost:3000/categories`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then((t) => setCategories(t));
};

export default apiReadCategoryList;
