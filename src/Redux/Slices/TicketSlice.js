import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosConfig from "../../config/axiosConfig";

const initialState = {
    ticketList: []
};

export const getMyAssignedTickets = createAsyncThunk('tickets/getMyAssignedTickets', async () => {
    try {
        const response = axiosConfig.get("getMyAssignedTickets", {
            headers: {
                "x-access-token" : localStorage.token
            }
        });
        toast.promise(response, {
            success: "Successfully loaded all tickets",
            error: "Something went wrong while fetching tickets!",
            loading: "Fetching the tickets"
        });
        return await response;
    } catch (error) {
        console.log(error);
    }
});

const ticketSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMyAssignedTickets.fulfilled, (state, action) => {
            if(!action?.payload?.data) return;
            state.ticketList = action?.payload?.data?.result;
        });
    }
});

export default ticketSlice.reducer;