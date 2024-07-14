import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosConfig from "../../config/axiosConfig";

const initialState = {
    allTickets: [],
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

export const getAllTickets = createAsyncThunk('ticket/getAllTickets', async () => {
    try {
        let response;
        if(localStorage.role === 'admin') response = axiosConfig.get("ticket", {
            headers: {
                "x-access-token" : localStorage.token
            }
        });
        else response = [];
        toast.promise(response, {
            success: "Successfully loaded all tickets",
            error: "Something went wrong while fetching tickets!",
            loading: "Fetching all the tickets"
        });
        return await response;
    } catch (error) {
        console.log(error);
    }
});

export const getMyAssignedTickets = createAsyncThunk('tickets/getTickets', async () => {
    try {
        let response;
        if(localStorage.role != 'customer') response = axiosConfig.get("getMyAssignedTickets", {
            headers: {
                "x-access-token" : localStorage.token
            }
        });
        else {
            response = axiosConfig.get("getMyCreatedTickets", {
                headers: {
                    "x-access-token" : localStorage.token
                }
            });
        }
        toast.promise(response, {
            success: "Successfully loaded your tickets",
            error: "Something went wrong while fetching your tickets!",
            loading: "Fetching your tickets"
        });
        return await response;
    } catch (error) {
        console.log(error);
    }
});

export const updateTicket = createAsyncThunk('tickets/updateTickets', async (ticket) => {
    try {
        const response = axiosConfig.patch(`/ticket/${ticket._id}`, 
            {...ticket, updatedAt : new Date()}, {
            headers : {
                'x-access-token' : localStorage.getItem('token')
            }
        });
        toast.promise(response, {
            success: "Successfully updated the ticket",
            loading: "Updating the ticket",
            error: "Something went wrong while updating ticket!",
        });
        return await response;
    } catch (error) {
        console.log(error);
    }
});

export const createTicket = createAsyncThunk('/tickets/create', async (data) => {
    try {
        const response = axiosConfig.post('/ticket',
            data, {
                headers : {
                    'x-access-token': localStorage.getItem('token')
                }
            }
        );
        toast.promise(response, {
            success: "Successfully created the ticket",
            loading: "Creating the ticket",
            error: "Something went wrong while creating ticket!",
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
        getAllTicketsForAdmin : (state) => {
            state.ticketList = state.allTickets;
        },
        filterTickets : (state, action) => {
            let ticketStatus = action.payload.status;
            if(ticketStatus) {
                ticketStatus = ticketStatus.toLowerCase();
                if(ticketStatus == 'in progress') ticketStatus = 'inProgress';
                if(ticketStatus == 'on hold') ticketStatus = 'onHold';
                state.ticketList = state.downloadTickets.filter((ticket) => ticket.status === ticketStatus);
            }
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
        builder
        .addCase(getMyAssignedTickets.fulfilled, (state, action) => {
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
        })
        .addCase(getAllTickets.fulfilled, (state, action) => {
            if(!action?.payload?.data) return;
            const allDownloadedTickets = action?.payload?.data?.result;
            state.allTickets = allDownloadedTickets;
        })
        .addCase(updateTicket.fulfilled, (state, action) => {
            const updatedticket = action.payload.data.result;
            state.downloadTickets = state.downloadTickets.map((ticket) => {
                if(ticket._id == updatedticket._id) return updatedticket;
                return ticket;
            });
            state.ticketList = state.ticketList.map((ticket) => {
                if(ticket._id == updatedticket._id) return updatedticket;
                return ticket;
            });
            state.ticketType = {
                open: 0,
                inProgress: 0,
                resolved: 0,
                onHold: 0,
                cancelled: 0
            };
            state.downloadTickets.forEach((ticket) => {
                state.ticketType[ticket.status] = state.ticketType[ticket.status] + 1;
            });
        })
        .addCase(createTicket.fulfilled, (state, action) => {
            const newTicket = action?.payload?.data;
            state.downloadTickets.push(newTicket);
            console.log(state.downloadTickets);
            state.ticketType = {
                open: 0,
                inProgress: 0,
                resolved: 0,
                onHold: 0,
                cancelled: 0
            };
            state.downloadTickets.forEach((ticket) => {
                state.ticketType[ticket.status] = state.ticketType[ticket.status] + 1;
            });
        });
    }
});

export const { filterTickets, resetTicketList, logoutTicket, getAllTicketsForAdmin } = ticketSlice.actions;
export default ticketSlice.reducer;