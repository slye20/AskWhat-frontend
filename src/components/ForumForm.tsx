import Thread from "../types/Thread";

import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { Button, Checkbox, TextField, Autocomplete } from "@mui/material";

type Prop = {
    thread: Thread;
    error: string;
    setError: (value: string) => void;
    setThread: (thread: Thread) => void;
    handleSubmit: (event: FormEvent) => void;
};

const ForumForm: FC<Prop> = ({ thread, error, setThread, setError, handleSubmit }) => {
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

    const handleChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setThread({ ...thread, [field]: event.target.value });
        setError("");
    };

    const handleSelectChange = (val: string[]) => {
        setThread({ ...thread, categories: val });
    };
    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <TextField
                onChange={handleChange("title")}
                label="Title"
                fullWidth={true}
                size="small"
                value={thread.title}
                sx={{ m: 1 }}
            />
            <br />
            <TextField
                onChange={handleChange("content")}
                label="Details"
                multiline
                rows={4}
                placeholder="Share your thoughts!"
                fullWidth={true}
                size="small"
                value={thread.content}
                sx={{ m: 1 }}
            />
            <Autocomplete
                multiple
                onChange={(_, val) => handleSelectChange(val)}
                disableCloseOnSelect
                options={categories}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox checked={selected} />
                        {option}
                    </li>
                )}
                renderInput={(params) => <TextField {...params} label="Categories" />}
                sx={{ m: 1 }}
                value={thread.categories}
                fullWidth
            />
            {error && <div style={{ color: "red", margin: "10px 0", whiteSpace: "pre-line" }}>{error}</div>}
            <Button color="warning" variant="contained" type="submit" sx={{ m: 1 }}>
                Submit
            </Button>
        </form>
    );
};

export default ForumForm;
