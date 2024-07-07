import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosConfig from "../../config/axiosConfig";

const initialState = {
    role: localStorage.getItem("role") || "",
    data: JSON.parse(localStorage.getItem("data")) || {},
    token: localStorage.getItem("token") || "",
    isloggedIn: localStorage.getItem("isLoggedIn") || false
};

export const login = createAsyncThunk('/auth/login', async (data) => {
    try {
        const response = axiosConfig.post("auth/signin", data);
        toast.promise(response, {
            loading: "Form Submitting",
            success: "Successfully login",
            error: "Something went wrong, try again!"
        });
        return await response;
    } catch (error) {
        console.log(error);
    }
});

export const signUp = createAsyncThunk('/auth/signup', async (data) => {
    try {
        const response = axiosConfig.post("auth/signup", data);
        toast.promise(response, {
            loading: "Form Submitting",
            success: "Successfully signup",
            error: "Something went wrong, try again!"
        });
        return await response;
    } catch (error) {
        console.log(error);
    }
});

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if(!action.payload) return;
            state.isloggedIn = (action.payload?.data?.token != undefined),
            state.data = action.payload?.data?.userData;
            state.token = action.payload?.data?.token;
            state.role = action.payload?.data?.userData?.userType;
            localStorage.setItem("role", action.payload?.data?.userData?.userType);
            localStorage.setItem("isLoggedIn", (action.payload?.data?.token != undefined));
            localStorage.setItem("data", JSON.stringify(action.payload?.data?.userData));
            localStorage.setItem("token", action.payload?.data?.token);
        });
    }
});

export default authSlice.reducer;