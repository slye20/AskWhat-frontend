import CommentItem from "./CommentItem";
import Comment from "../types/Comment";

import React from "react";

type Props = {
    comments: Comment[];
};

const BasicCommentList: React.FC<Props> = ({ comments }) => {
    return (
        <ul>
            {comments.map((comment) => (
                <CommentItem comment={comment} key={comment.id} />
            ))}
        </ul>
    );
};

export default BasicCommentList;
