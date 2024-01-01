import Category from "../types/Category";
import { Button, Checkbox, TextField, Typography, Autocomplete } from "@mui/material";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Thread = {
    title: string;
    content: string;
    categories: string[];
};

const CreateThread: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [thread, setThread] = useState<Thread>({ title: "", content: "", categories: [] });
    const [error, setError] = useState(""); // error if content is empty
    const navigate = useNavigate();

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

        fetch("http://localhost:3000/forum_threads/", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.jwt}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ thread }),
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else if (res.status === 401) {
                    // 401 unauthorized
                    navigate("/login");
                } else if (res.status === 406 || res.status === 422) {
                    // 406 not acceptable
                    return res.json().then((err) => {
                        console.log(err);
                        throw new Error(err.error.join("\n"));
                    });
                } else {
                    throw new Error("An error occurred. Please try again later.");
                }
            })
            .then((data) => {
                localStorage.setItem("jwt", data.jwt);
                navigate(`/`);
            })
            .catch((error) => setError(error.message));
    };

    const handleChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setThread({ ...thread, [field]: event.target.value });
        setError("");
    };

    const handleSelectChange = (val: string[]) => {
        console.log(val);
        setThread({ ...thread, categories: val });
    };

    return (
        <div style={{ margin: "auto", textAlign: "center", width: "80vw" }}>
            <Typography variant="h5" component="h5" marginTop={2}>
                {"Create New Thread"}
            </Typography>

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
                    options={categories}
                    onChange={(_, val) => handleSelectChange(val.map((item) => item.name))}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <Checkbox checked={selected} />
                            {option.name}
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} label="Categories" />}
                    sx={{ m: 1 }}
                    fullWidth
                />
                {error && <div style={{ color: "red", margin: "10px 0", whiteSpace: "pre-line" }}>{error}</div>}
                <Button color="warning" variant="contained" type="submit" sx={{ m: 1 }}>
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default CreateThread;
