import CommentItem from "./CommentItem";
import Comment from "../../types/Comment";

import React from "react";

/**
 * Represents a component that displays a list of comments. It iterates over an array of 'Comment' objects and renders each one using the 'CommentItem' component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Required<Comment>[]} props.comments - An array of comment objects to be displayed.
 * @returns {React.ReactElement} A React element representing a list of comments, each rendered using `CommentItem`.
 */

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
