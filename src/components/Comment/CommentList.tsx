import CommentItem from "./CommentItem";
import Comment from "../../types/Comment";

import React from "react";

type Props = {
    comments: Required<Comment>[];
};

const CommentList: React.FC<Props> = ({ comments }) => {
    return (
        <ul>
            {comments.map((comment) => (
                <CommentItem data={comment} key={comment.id} />
            ))}
        </ul>
    );
};

export default CommentList;
