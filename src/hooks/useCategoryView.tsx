import Thread from "../types/Thread";
import Category from "../types/Category";
import apiReadCategory from "../services/ReadCategoryService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/**
 * Custom hook for managing and fetching category and thread data.
 *
 * This hook is responsible for fetching category and thread data based on the category ID obtained from the URL parameters.
 * It uses `apiReadCategory` service to fetch the data. It keeps track of the category and threads state and updates them
 * based on the response from the API. In case of an error or if the category is not found, it navigates the user away.
 *
 * @returns {{category: Category, threads: Required<Thread>[]}} An object containing the category and its threads.
 */

const useCategoryView = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState<Category>({
        id: 0,
        name: "",
        description: "",
    });
    const [threads, setThreads] = useState<Required<Thread>[]>([]);

    useEffect(() => {
        apiReadCategory(String(categoryId), setThreads, setCategory, navigate);
    }, [categoryId]);

    return { category, threads };
};

export default useCategoryView;
