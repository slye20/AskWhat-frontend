import useForumForm from "../../hooks/useForumForm";
import CustomButton from "../UI/CustomButton";
import CustomTextField from "../UI/CustomTextField";
import Thread from "../../types/Thread";
import React, { FC, FormEvent } from "react";
import { Checkbox, Autocomplete } from "@mui/material";

/**
 * Represents a card form for editing/creating a thread.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Thread} props.thread - The thread object to be edited or for reference in creating a new one.
 * @param {string} props.error - An error message to display (if any).
 * @param {function} props.setError - Function to set the error message.
 * @param {function} props.setThread - Function to update the thread state.
 * @param {function} props.handleSubmit - Function to handle form submission.
 * @returns {React.ReactElement} A React element representing a form for editing or creating a thread.
 */

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
