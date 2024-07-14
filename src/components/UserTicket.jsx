import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HomeLayout from "../layout/HomeLayout";
import { createTicket } from "../Redux/Slices/TicketSlice";

function UserTicket() {

    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [formDetails, setFormDetails] = useState({
        title: '',
        description: '',
        status: 'open',
        ticketPriority: 4,
        clientName:authState.data.clientName,
    });

    async function onFormSubmit(e) {
        e.preventDefault();
        const response = await dispatch(createTicket(formDetails));
        if(response) {
            setFormDetails({
                title: '',
                description: '',
                status: 'open',
                ticketPriority: 4,
                clientName:authState.data.clientName,
            });
        }
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center w-[90vw]">
                <form
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center items-center gap-8 w-[25rem] border border-gray-600 p-8 rounded-lg">
                    <h1 className="text-5xl mb-4 font-semibold">Create Ticket</h1>
                    <input value={formDetails.title} onChange={(e) => setFormDetails({...formDetails, title: e.target.value})} type="text" placeholder="Title..." className="w-[100%] input input-bordered bg-gray-800"/>
                    <textarea value={formDetails.description} onChange={(e) => setFormDetails({...formDetails, description: e.target.value})} rows={5} className="w-[100%] textarea textarea-bordered bg-gray-800 resize-none" placeholder="Description..."></textarea>
                    <button className="w-[100%] btn btn-primary">Submit</button>
                </form>
            </div>
        </HomeLayout>
    );
}

export default UserTicket;