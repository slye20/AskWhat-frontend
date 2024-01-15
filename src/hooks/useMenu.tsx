import Comment from "../types/Comment";
import Thread from "../types/Thread";
import apiDeleteComment from "../services/DeleteCommentService";
import apiDeleteThread from "../services/DeleteThreadService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook for managing menu interactions for comments or threads.
 *
 * This hook provides functionality for opening a menu, handling edit and delete actions, and closing the menu.
 * It is designed to work with either a Comment or a Thread object, determining the appropriate actions based on the data type.
 * The hook also handles navigation and error setting for delete operations.
 *
 * @param {Comment|Thread} data - The data object (either a Comment or a Thread).
 * @param {function} setError - Function to set error messages.
 * @param {function} setEdit - Function to toggle edit mode.
 * @returns {{ thread, comments, handleNewComment, navigate, isLoading }} An object containing menu state and handlers.
 */

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
