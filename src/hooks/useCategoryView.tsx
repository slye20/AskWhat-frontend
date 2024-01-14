import Thread from "../types/Thread";
import Category from "../types/Category";
import apiReadCategory from "../services/ReadCategoryService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
