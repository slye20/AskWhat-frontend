import apiReadCategoryList from "../services/ReadCategoryListService";
import Category from "../types/Category";
import Thread from "../types/Thread";
import { ChangeEvent, useEffect, useState } from "react";

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
