import MainPost from "../components/Forum/MainPost";
import MakeComment from "../components/Comment/MakeComment";
import CommentList from "../components/Comment/CommentList";
import useThreadData from "../hooks/useThreadData";
import CustomButton from "../components/ui/CustomButton";

import { useParams } from "react-router-dom";
import React from "react";

const StyledThreadView: React.FC = () => {
    const { threadId } = useParams();
    const { result, navigate } = useThreadData(threadId as string);

    return (
        <div style={{ width: "80vw", margin: "auto" }}>
            <MainPost thread1={result.thread} />
            <CommentList comments={result.comments} />
            {localStorage.jwt ? (
                <MakeComment />
            ) : (
                <CustomButton label="Log In to Comment" onClick={() => navigate("/login")} />
            )}
        </div>
    );
};

export default StyledThreadView;
