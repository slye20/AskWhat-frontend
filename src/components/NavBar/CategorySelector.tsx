import { Box, MenuItem, FormControl, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
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
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const url = `http://localhost:3000/categories`;
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((t) => setCategories(t));
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        value ? navigate(`/category/${event.target.value}`) : {};
    };

    const navigate = useNavigate();
    return (
        <Box>
            <StyledFormControl fullWidth sx={{ minWidth: 200 }}>
                <Select
                    onChange={handleChange}
                    displayEmpty
                    value=""
                    sx={{
                        color: "white",
                    }}
                >
                    <MenuItem value="" disabled>
                        <em>Category</em>
                    </MenuItem>
                    {categories.map((category, index) => (
                        <MenuItem value={category} key={index}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </StyledFormControl>
        </Box>
    );
};

export default CategorySelector;
