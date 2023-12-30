import Category from "../types/Category";
import {
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

type FormData = {
    title: string;
    text: string;
    categories: string[];
};

const CreateThread: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState<FormData>({ title: "", text: "", categories: [] });
    const [errors, setErrors] = useState(""); // error if content is empty

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

    // When submit button is pressed, add thread, reroute to new thread
    const handleSubmit = (event: FormEvent) => {
        // prevent page from refreshing
        event.preventDefault();
        console.log(formData);
    };

    const handleChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: event.target.value });
        setErrors("");
    };

    const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
        setFormData({ ...formData, categories: event.target.value as string[] });
    };

    errors; //remove

    return (
        <div style={{ margin: "auto", textAlign: "center", width: "80vw" }}>
            <Typography variant="h5" component="h5" marginTop={2}>
                {"Threads"}
            </Typography>

            <form onSubmit={(event) => handleSubmit(event)}>
                <TextField
                    onChange={handleChange("title")}
                    label="Title"
                    fullWidth={true}
                    size="small"
                    value={formData.title}
                    sx={{ m: 1 }}
                />
                <br />
                <TextField
                    onChange={handleChange("text")}
                    label="Details (Optional)"
                    multiline
                    rows={4}
                    placeholder="Share your thoughts!"
                    fullWidth={true}
                    size="small"
                    value={formData.text}
                    sx={{ m: 1 }}
                />
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel id="category-select-label">Categories</InputLabel>
                    <Select
                        multiple
                        value={formData.categories}
                        onChange={handleSelectChange}
                        input={<OutlinedInput label="Categories" />}
                        renderValue={(selected) => selected.join(", ")}
                        labelId="category-select-label"
                    >
                        {categories.map((category) => (
                            <MenuItem value={category.name} key={category.name}>
                                <Checkbox checked={formData.categories.indexOf(category.name) > -1} />
                                <ListItemText primary={category.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />
                <Button color="warning" variant="contained" type="submit" sx={{ m: 1 }}>
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default CreateThread;
