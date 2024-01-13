import ForumCard from "./ForumCard";
import Thread from "../../types/Thread";
import React from "react";
import { List } from "@mui/material";

type Props = {
    threads: Required<Thread>[];
};

const ForumList: React.FC<Props> = ({ threads }) => {
    return (
        <List>
            {threads.map((thread, index) => (
                <ForumCard thread={thread} key={index} />
            ))}
        </List>
    );
};

export default ForumList;
