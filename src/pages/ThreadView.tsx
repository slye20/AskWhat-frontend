import MainPost from "../components/Forum/MainPost";
import MakeComment from "../components/Comment/MakeComment";
import CommentList from "../components/Comment/CommentList";
import useThreadData from "../hooks/useThreadData";
import CustomButton from "../components/UI/CustomButton";

import { useParams } from "react-router-dom";
import React from "react";

/**
 * Page component for displaying a specific thread in the forum.
 *
 * This component fetches and displays the details of a specific thread, including the main post and its comments, using the `useThreadData` hook.
 * It provides an interface to add new comments if the user is logged in. Otherwise, it displays a button prompting users to log in to comment.
 * The component handles loading states and navigates to the login page as required.
 *
 * @component
 * @returns {React.ReactElement} A React element representing the detailed view of a specific forum thread, including its comments and the option to add new comments.
 */

const ThreadView: React.FC = () => {
    const { threadId } = useParams();
    const { thread, comments, handleNewComment, navigate, isLoading } = useThreadData(threadId as string);

    if (isLoading) {
        // Render a loading indicator
        return <div>Loading...</div>;
    }

    return (
        <div style={{ width: "80vw", margin: "auto" }}>
            <MainPost data={thread} />
            <CommentList comments={comments} />
            {localStorage.jwt ? (
                <MakeComment handleNewComment={handleNewComment} />
            ) : (
                <CustomButton label="Log In to Comment" onClick={() => navigate("/login")} />
            )}
        </div>
    );
};

export default ThreadView;
