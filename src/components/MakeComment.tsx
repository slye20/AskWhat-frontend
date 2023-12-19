import Comment from "../types/Comment";
import "../App.css";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

type Props = {
    onAddComment: (newComment: Comment) => void;
};

const MakeComment: React.FC<Props> = ({ onAddComment }: Props) => {
    const [formData, setFormData] = useState({ text: "", username: "" });
    const [errors, setErrors] = useState({ text: false, username: false }); // error if content is empty

    // When submit button is pressed, add comment, clear inputs
    const handleSubmit = (event: FormEvent) => {
        // prevent page from refreshing
        event.preventDefault();
        const { text, username } = formData;
        const newErrors = { text: !text.trim(), username: !username.trim() };

        if (newErrors.text || newErrors.username) {
            setErrors(newErrors);
            return;
        }

        onAddComment({
            body: text,
            author: username,
            timestamp: new Date(),
            key: 999,
        });

        setFormData({ ...formData, text: "" });
    };

    const handleChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: event.target.value });
        setErrors({ ...errors, [field]: false });
    };

    return (
        <div style={{ margin: "auto", textAlign: "center" }}>
            <form onSubmit={(event) => handleSubmit(event)}>
                <TextField
                    error={errors.text}
                    helperText={errors.text ? "This field cannot be empty." : ""}
                    onChange={handleChange("text")}
                    label="New Post?"
                    multiline
                    rows={4}
                    placeholder="Share your thoughts!"
                    fullWidth={true}
                    size="small"
                    value={formData.text}
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
                    <Button color="warning" variant="contained" type="submit" style={{ margin: "10px 20px" }}>
                        post
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default MakeComment;
