import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosConfig from "../../config/axiosConfig";

const initialState = {
    downloadTickets: [],
    ticketList: [],
    ticketType: {
        open: 0,
        inProgress: 0,
        resolved: 0,
        onHold: 0,
        cancelled: 0
    }
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
    reducers: {
        filterTickets : (state, action) => {
            let ticketStatus = action.payload.status.toLowerCase();
            if(ticketStatus == 'in progress') ticketStatus = 'inProgress';
            if(ticketStatus == 'on hold') ticketStatus = 'onHold';
            state.ticketList = state.downloadTickets.filter((ticket) => ticket.status === ticketStatus);
        },
        resetTicketList: (state) => {
            state.ticketList = state.downloadTickets;
        },
        logoutTicket : (state) => {
            state.downloadTickets = [],
            state.ticketList = [],
            state.ticketType = {
                open: 0,
                inProgress: 0,
                resolved: 0,
                onHold: 0,
                cancelled: 0
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMyAssignedTickets.fulfilled, (state, action) => {
            if(!action?.payload?.data) return;
            state.ticketList = action?.payload?.data?.result;
            state.downloadTickets = action?.payload?.data?.result;
            const tickets = action?.payload?.data?.result;
            state.ticketType = {
                open: 0,
                inProgress: 0,
                resolved: 0,
                onHold: 0,
                cancelled: 0
            };
            tickets.forEach((ticket) => {
                state.ticketType[ticket.status] = state.ticketType[ticket.status] + 1;
            });
        });
    }
});

export const { filterTickets, resetTicketList, logoutTicket } = ticketSlice.actions;
export default ticketSlice.reducer;