import IndividualThreadView from "./pages/IndividualThreadView";
import Home from "./pages/Home";
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
                        {/* <Route path="/thread/1" element={<BasicThreadView />} /> */}
                        <Route path="/thread/:threadId" element={<IndividualThreadView />} />
                        <Route path="/" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;
