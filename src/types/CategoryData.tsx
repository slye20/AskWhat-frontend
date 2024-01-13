import Thread from "./Thread";
import Category from "./Category";

type CategoryData = {
    category: Category;
    threads: Required<Thread>[];
};

export default CategoryData;
