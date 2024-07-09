import { Route, Routes } from "react-router-dom";

import Dashboard from "../components/Dashboard";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import Home from "../pages/Home/Home";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
        </Routes>
    );
}

export default MainRoutes;