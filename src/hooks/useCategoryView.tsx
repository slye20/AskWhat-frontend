import CategoryData from "../types/CategoryData";
import apiReadCategory from "../services/ReadCategoryService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useCategoryView = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<CategoryData>({
        category: {
            id: 0,
            name: "",
            description: "",
        },
        threads: [],
    });

    useEffect(() => {
        apiReadCategory(String(categoryId), setData, navigate);
    }, [categoryId]);

    return { data };
};

export default useCategoryView;
