import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMyAssignedTickets } from "../Redux/Slices/TicketSlice";

function useTicket() {
    const authState = useSelector((state) => state.auth);
    const ticketState = useSelector((state) => state.tickets);

    const dispatch = useDispatch();

    async function loadTickets() {
        await dispatch(getMyAssignedTickets());
        // console.log(response);
    }

    useEffect(() => {
        loadTickets();
    }, [authState.token]);

    return [ticketState];
}

export default useTicket;