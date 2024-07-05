import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: localStorage.getItem("role") || "",
    data: localStorage.getItem("data") || {},
    loggedIn: localStorage.getItem("isLoggedIn") || false
}

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {}
});

export default authSlice.reducer;