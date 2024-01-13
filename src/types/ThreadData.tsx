import Thread from "./Thread";
import Comment from "./Comment";

type ThreadData = {
    thread: Thread;
    comments: Required<Comment>[];
};

export default ThreadData;
