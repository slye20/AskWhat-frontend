import Thread from "./Thread";
import Comment from "./Comment";

type ThreadData = {
    thread: Thread | undefined;
    comments: Required<Comment>[];
};

export default ThreadData;
