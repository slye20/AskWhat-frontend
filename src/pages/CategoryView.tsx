import useCategoryView from "../hooks/useCategoryView";
import CustomButton from "../components/UI/CustomButton";
import ForumList from "../components/Forum/ForumList";
import React from "react";
import { Box, Typography } from "@mui/material";

/**
 * Page component for displaying threads of a specific category.
 *
 * This component uses the `useCategoryView` hook to fetch and display data related to a particular category and its threads.
 * It shows the category name, description, and a list of threads within that category. Also includes a button for additional actions like 'Show More'.
 *
 * @component
 * @returns {React.ReactElement} A React element representing the category view page, including category details and a list of threads.
 */

const CategoryView = () => {
    const { category, threads } = useCategoryView();

    return (
        <Box sx={{ width: "80vw", margin: "auto", bgcolor: "background.paper" }}>
            <Typography variant="h5" sx={{ mx: 2, mt: 1 }} align="left">
                <u>{category.name}</u>
            </Typography>
            <Typography variant="body1" sx={{ mx: 2 }} align="left">
                {category.description}
            </Typography>
            <ForumList threads={threads} />
            <CustomButton label="Show More" disabled />
        </Box>
    );
};

export default CategoryView;
