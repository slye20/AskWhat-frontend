import NavBar from "./components/NavBar/NavBar";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import IndividualThreadView from "./pages/IndividualThreadView";
import Home from "./pages/Home";
import CreateNewThread from "./pages/CreateNewThread";
import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, orange } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: blue,
        secondary: orange,
    },
});

type LoginData = {
    user: {
        username: string;
        password: string;
    };
};

// FC = function component
const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        loginStatus();
    }, []); // Run once after the initial render

    const loginStatus = () => {
        const url = `http://localhost:3000/logged_in`;
        fetch(url, { credentials: "include" })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((data) => {
                if (data.logged_in) {
                    handleLogin(data);
                } else {
                    handleLogout();
                }
            })
            .catch((error) => console.log("api errors:", error));
    };

    const handleLogin = (data: LoginData) => {
        setIsLoggedIn(true);
        setUser(data.user);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser({});
    };

    // remove
    isLoggedIn;
    user;

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/thread/:threadId"
                            element={
                                <>
                                    <NavBar />
                                    <IndividualThreadView />
                                </>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <>
                                    <NavBar />
                                    <Home />
                                </>
                            }
                        />
                        <Route
                            path="/new"
                            element={
                                <>
                                    <NavBar />
                                    <CreateNewThread />
                                </>
                            }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;
