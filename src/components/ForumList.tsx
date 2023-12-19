import ForumCard from "./ForumCard";
import Forum from "../types/Forum";
import React from "react";
import { List } from "@mui/material";

type Props = {
    threads: Forum[];
};

const ForumList: React.FC<Props> = ({ threads }) => {
    return (
        <List sx={{ width: "80vw", margin: "auto", bgcolor: "background.paper" }}>
            {threads.map((thread) => (
                <ForumCard thread={thread} key="" /> // pass in empty key? what for?
            ))}
        </List>
    );
};

export default ForumList;
