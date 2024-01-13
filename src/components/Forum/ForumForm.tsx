import useForumForm from "../../hooks/useForumForm";
import CustomButton from "../ui/CustomButton";
import CustomTextField from "../ui/CustomTextField";
import Thread from "../../types/Thread";
import React, { FC, FormEvent } from "react";
import { Checkbox, Autocomplete } from "@mui/material";

type Prop = {
    thread: Thread;
    error: string;
    setError: (value: string) => void;
    setThread: (thread: Thread) => void;
    handleSubmit: (event: FormEvent) => void;
};

const ForumForm: FC<Prop> = ({ thread, error, setThread, setError, handleSubmit }) => {
    const { categoryNames, handleChange, handleSelectChange } = useForumForm(thread, setError, setThread);

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <CustomTextField onChange={handleChange("title")} label="Title" value={thread.title} />
            <CustomTextField
                onChange={handleChange("content")}
                label="Details"
                minRows={4}
                placeholder="Share your thoughts!"
                value={thread.content}
            />
            <Autocomplete
                multiple
                onChange={(_, val) => handleSelectChange(val)}
                disableCloseOnSelect
                options={categoryNames}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox checked={selected} />
                        {option}
                    </li>
                )}
                renderInput={(params) => <CustomTextField {...params} label="Categories" />}
                value={thread.categories}
                fullWidth
            />
            {error && <div style={{ color: "red", margin: "10px 0", whiteSpace: "pre-line" }}>{error}</div>}
            <CustomButton type="submit" label="Submit" />
        </form>
    );
};

export default ForumForm;
