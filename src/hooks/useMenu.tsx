import Comment from "../types/Comment";
import Thread from "../types/Thread";
import apiDeleteComment from "../services/DeleteCommentService";
import apiDeleteThread from "../services/DeleteThreadService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const useMenu = (data: Comment | Thread, setError: (error: string) => void, setEdit: (bool: boolean) => void) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleEdit = () => {
        setAnchorEl(null);
        setEdit(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        if ("title" in data) {
            apiDeleteThread(data as Thread, setError, navigate);
        } else {
            apiDeleteComment(data as Comment, setError, navigate);
        }
        setAnchorEl(null);
        window.location.reload();
    };

    return { open, anchorEl, navigate, handleClick, handleEdit, handleClose, handleDelete };
};

export default useMenu;
