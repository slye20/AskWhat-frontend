import { Box, Button, TextField, Typography } from "@mui/material";

import React, { ChangeEvent, FormEvent, useState } from "react";

const CreateThread: React.FC = () => {
    const [formData, setFormData] = useState({ title: "", text: "", username: "" });
    const [errors, setErrors] = useState({ title: false, username: false }); // error if content is empty

    // When submit button is pressed, add thread, reroute to new thread
    const handleSubmit = (event: FormEvent) => {
        // prevent page from refreshing
        event.preventDefault();
        console.log(formData);
        const { title, username } = formData;
        const newErrors = { title: !title.trim(), username: !username.trim() };

        if (newErrors.title || newErrors.username) {
            setErrors(newErrors);
            return;
        }

        setFormData({ ...formData, title: "", text: "" });
    };

    const handleChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: event.target.value });
        setErrors({ ...errors, [field]: false });
    };

    return (
        <div style={{ margin: "auto", textAlign: "center", width: "80vw" }}>
            <Typography variant="h5" component="h5" marginTop={2}>
                {"Threads"}
            </Typography>

            <form onSubmit={(event) => handleSubmit(event)}>
                <TextField
                    error={errors.title}
                    helperText={errors.title ? "This field cannot be empty." : ""}
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
                <br />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        p: 1,
                        m: 1,
                        bgcolor: "background.paper",
                        borderRadius: 1,
                        justifyContent: "center",
                    }}
                >
                    <Box style={{ margin: "10px 20px" }}>
                        <TextField
                            error={errors.username}
                            helperText={errors.username ? "This field cannot be empty." : ""}
                            label="Username"
                            onChange={handleChange("username")}
                        />
                        <TextField label="Password (Optional)" type="password" name="password" />
                    </Box>
                </Box>
                <Button color="warning" variant="contained" type="submit" sx={{ m: 1 }}>
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default CreateThread;
