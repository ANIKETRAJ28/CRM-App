import { Route, Routes } from "react-router-dom";

import Dashboard from "../components/Dashboard";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import Home from "../pages/Home/Home";
import AuthRoutes from "./AuthRoutes";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route>
                <Route path="/users" element={<AuthRoutes/>}/>
            </Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
        </Routes>
    );
}

export default MainRoutes;