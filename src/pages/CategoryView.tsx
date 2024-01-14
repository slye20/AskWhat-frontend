import useCategoryView from "../hooks/useCategoryView";
import CustomButton from "../components/UI/CustomButton";
import ForumList from "../components/Forum/ForumList";
import React from "react";
import { Box, Typography } from "@mui/material";

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
            <CustomButton label="Show More" />
        </Box>
    );
};

export default CategoryView;
