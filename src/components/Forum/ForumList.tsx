import ForumCard from "./ForumCard";
import Thread from "../../types/Thread";
import React from "react";
import { List } from "@mui/material";

/**
 * Represents a component that displays a list of threads. It iterates over an array of 'Thread' objects and renders each one using the 'ForumCard' component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Required<Thread>[]} props.threads - An array of thread objects to be displayed.
 * @returns {React.ReactElement} A React element representing a list of threads, each rendered using `ForumCard`.
 */

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
