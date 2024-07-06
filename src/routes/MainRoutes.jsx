import { Route, Routes } from "react-router-dom";

import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";

function MainRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
        </Routes>
    );
}

export default MainRoutes;