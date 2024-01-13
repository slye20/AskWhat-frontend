import apiReadCategoryList from "../../services/ReadCategoryListService";
import Category from "../../types/Category";
import { Box, MenuItem, FormControl, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { alpha, styled } from "@mui/material/styles";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
    ".MuiInputBase-input": {
        padding: theme.spacing(1), // Reduced vertical padding
    },
    ".MuiSvgIcon-root ": {
        fill: "white",
    },
}));

// remove repeated?
const CategorySelector = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        apiReadCategoryList(setCategories);
    }, []);

    const onclick = (category: Category) => {
        navigate(`/category/${category.id}`);
    };

    const navigate = useNavigate();
    return (
        <Box>
            <StyledFormControl fullWidth sx={{ minWidth: 200 }}>
                <Select
                    displayEmpty
                    value=""
                    sx={{
                        color: "white",
                    }}
                >
                    <MenuItem value="" disabled>
                        <em>Category</em>
                    </MenuItem>
                    {categories.map((category) => (
                        <MenuItem value={category.name} key={category.id} onClick={() => onclick(category)}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </StyledFormControl>
        </Box>
    );
};

export default CategorySelector;
