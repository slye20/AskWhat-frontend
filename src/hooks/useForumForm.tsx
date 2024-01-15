import apiReadCategoryList from "../services/ReadCategoryListService";
import Category from "../types/Category";
import Thread from "../types/Thread";
import { ChangeEvent, useEffect, useState } from "react";

/**
 * Custom hook for managing the state of a forum form.
 *
 * This hook is designed to manage the state of a form used in a forum setting. It initializes with the provided thread data
 * and sets up handlers for changes in the form fields. It also manages the selection of categories by fetching the list of
 * categories from an API and handling changes in the category selection.
 *
 * @param {Thread} thread - The initial thread data for the form.
 * @param {function} setError - Function to set the error state in the parent component.
 * @param {function} setThread - Function to update the thread data in the parent component.
 * @returns {{ categoryNames, handleChange, handleSelectChange }} An object containing category names, and handlers for input and select changes.
 */

const useForumForm = (thread: Thread, setError: (error: string) => void, setThread: (thread: Thread) => void) => {
    const [categoryNames, setCategoryNames] = useState<string[]>([]);

    const setCategories = (categories: Category[]) => {
        const names = categories.map((category) => category.name);
        setCategoryNames(names);
    };

    useEffect(() => {
        apiReadCategoryList(setCategories);
    }, []);

    const handleChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setThread({ ...thread, [field]: event.target.value });
        setError("");
    };

    const handleSelectChange = (val: string[]) => {
        setThread({ ...thread, categories: val });
    };
    return { categoryNames, handleChange, handleSelectChange };
};

export default useForumForm;
