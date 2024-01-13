import useCategoryView from "../hooks/useCategoryView";
import CustomButton from "../components/ui/CustomButton";
import ForumList from "../components/Forum/ForumList";
import React from "react";
import { Box, Typography } from "@mui/material";

const CategoryView = () => {
    const { data } = useCategoryView();

    return (
        <Box sx={{ width: "80vw", margin: "auto", bgcolor: "background.paper" }}>
            <Typography variant="h5" sx={{ mx: 2, mt: 1 }} align="left">
                <u>{data.category.name}</u>
            </Typography>
            <Typography variant="body1" sx={{ mx: 2 }} align="left">
                {data.category.description}
            </Typography>
            <ForumList threads={data.threads} />
            <CustomButton label="Show More" />
        </Box>
    );
};

export default CategoryView;
