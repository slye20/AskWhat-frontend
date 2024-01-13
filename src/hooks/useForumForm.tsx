import apiReadCategory from "../services/ReadCategoryService";
import Thread from "../types/Thread";
import { ChangeEvent, useEffect, useState } from "react";

const useForumForm = (thread: Thread, setError: (error: string) => void, setThread: (thread: Thread) => void) => {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        apiReadCategory(setCategories);
    }, []);

    const handleChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setThread({ ...thread, [field]: event.target.value });
        setError("");
    };

    const handleSelectChange = (val: string[]) => {
        setThread({ ...thread, categories: val });
    };
    return { categories, handleChange, handleSelectChange };
};

export default useForumForm;
