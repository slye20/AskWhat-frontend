import Comment from "../types/Comment";
import apiDeleteComment from "../services/DeleteCommentService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const useMenu = (comment: Comment, setError: (error: string) => void, setEdit: (bool: boolean) => void) => {
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
        window.location.reload();
        apiDeleteComment(comment, setError, navigate);
        setAnchorEl(null);
    };

    return { open, anchorEl, navigate, handleClick, handleEdit, handleClose, handleDelete };
};

export default useMenu;
