import CategorySelector from "./CategorySelector";
import SearchBox from "./SearchBox";
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
// import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { Box, Toolbar, IconButton, Menu, Button } from "@mui/material";

const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        setAnchorEl(null);
        localStorage.removeItem("jwt");
        localStorage.removeItem("username");
    };

    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={0} sx={{ color: "white" }}>
                <Toolbar>
                    {/* <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton> */}
                    <Button
                        disableRipple
                        color="inherit"
                        sx={{
                            display: { xs: "none", sm: "block" },
                            textTransform: "none",
                            fontSize: 20,
                        }}
                        onClick={() => navigate("/")}
                    >
                        AskWhat
                    </Button>

                    <CategorySelector />

                    <SearchBox />

                    <IconButton
                        onClick={() => (localStorage.getItem("jwt") ? navigate("/new") : navigate("/login"))}
                        sx={{ ml: 2 }}
                        color="inherit"
                    >
                        <AddCircleIcon />
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }} />
                    {localStorage.jwt ? (
                        <>
                            <IconButton
                                id="basic-button"
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                                sx={{ ml: 2 }}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                keepMounted
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby": "basic-button",
                                }}
                            >
                                <MenuItem onClick={handleClose}>Account</MenuItem>
                                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Button color="inherit" onClick={() => navigate("login")}>
                            Login
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;
