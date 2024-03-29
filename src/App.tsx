import NavBar from "./components/NavBar/NavBar";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ThreadView from "./pages/ThreadView";
import Home from "./pages/Home";
import CategoryView from "./pages/CategoryView";
import CreateNewThread from "./pages/CreateNewThread";
import React from "react";
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

// FC = function component
const App: React.FC = () => {
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
                                    <ThreadView />
                                </>
                            }
                        />
                        <Route
                            path="/category/:categoryId"
                            element={
                                <>
                                    <NavBar />
                                    <CategoryView />
                                </>
                            }
                        />
                        <Route
                            path="/*"
                            element={
                                <>
                                    <NavBar />
                                    <Home />
                                </>
                            }
                        />
                        <Route
                            path="/search"
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
