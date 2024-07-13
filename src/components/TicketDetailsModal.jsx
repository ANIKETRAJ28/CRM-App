import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { filterTickets, updateTicket } from "../Redux/Slices/TicketSlice";

function TicketDetailsModal({ticket}) {

    const [searchParams] = useSearchParams();
    const [selectedTicket, setSelectedTicket] = useState(ticket);
    const [editTicket, setEditTicket] = useState(false);

    const dispatch = useDispatch();

    function handleUserDetailsChange(e) {
        const name = e.target.name;
        setSelectedTicket({...selectedTicket, [name] : e.target.value});
    }

    function handleDropDownChange(e) {
        let dropdown = e.target.parentElement.parentElement.parentElement;
        let dropDownValue = e.target.parentElement.parentElement.previousSibling;
        const name = dropDownValue.getAttribute("name");
        setSelectedTicket({...selectedTicket, [name] : e.target.textContent});
        dropdown.open = !dropdown.open;
    }

    async function handleTicketUpdate() {
        setEditTicket(!editTicket);
        await dispatch(updateTicket(selectedTicket));
        dispatch(filterTickets({status: searchParams.get("status")}));
        const modal = document.getElementById("ticketDetailsModal");
        modal.close();
    }

    function handleModalEdit() {
        setEditTicket(false);
        setSelectedTicket(ticket);
    }

    return (
        <dialog id="ticketDetailsModal" className="modal">
            {
                (!editTicket) ?
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{selectedTicket.title}</h3>
                    <p className="py-4 text-sm font-semibold">Description : <span className="text-yellow-500">{selectedTicket.description}</span></p>
                    <p className="py-4 text-sm font-semibold">Client Name : <span className="text-yellow-500">{selectedTicket.clientName}</span></p>
                    <div className="flex justify-between w-[60%]">
                        <p className="py-4 text-sm font-semibold">Status : <span className="text-yellow-500">{selectedTicket.status}</span></p>
                        <p className="py-4 text-sm font-semibold">Priority : <span className="text-yellow-500">{selectedTicket.ticketPriority}</span></p>
                    </div>
                    <div className="modal-action mt-0">
                    <button onClick={() => setEditTicket(!editTicket)} className="btn btn-primary">Edit</button>
                    </div>
                </div> :
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        <textarea onChange={handleUserDetailsChange} name="title" value={selectedTicket.title} className=" resize-none textarea bg-neutral w-[100%] h-10" placeholder="Bio"></textarea>
                    </h3>
                    <textarea onChange={handleUserDetailsChange} name="description" value={selectedTicket.description} className=" resize-none textarea bg-neutral w-[100%] h-20"></textarea>
                    <div className="flex justify-between w-[60%]">
                        <p className="py-4 text-sm font-semibold">Status :&nbsp;
                            <details className="dropdown ml-2">
                                    <summary name="status" className="btn btn-neutral px-2 rounded-md text-yellow-500">{selectedTicket.status}</summary>
                                    <ul onClick={handleDropDownChange} className="menu dropdown-content rounded-md z-[1] p-1 shadow text-yellow-500 bg-neutral w-fit">
                                        <li><a>open</a></li>
                                        <li><a>inProgress</a></li>
                                        <li><a>resolved</a></li>
                                        <li><a>onHold</a></li>
                                        <li><a>cancelled</a></li>
                                    </ul>
                            </details>
                        </p>
                        <p className="py-4 text-sm font-semibold">Priority :&nbsp;
                            <details className="dropdown ml-2">
                                    <summary name="ticketPriority" className="btn btn-neutral px-4 rounded-md text-yellow-500">{selectedTicket.ticketPriority}</summary>
                                    <ul onClick={handleDropDownChange} className="menu dropdown-content rounded-md z-[1] p-1 shadow text-yellow-500 bg-neutral w-fit">
                                    <li><a>1</a></li>
                                    <li><a>2</a></li>
                                    <li><a>3</a></li>
                                    <li><a>4</a></li>
                                    </ul>
                            </details>
                        </p>
                    </div>
                    <div className="modal-action mt-0">
                    <button onClick={handleTicketUpdate} className="btn btn-primary">Update</button>
                    </div>
                </div>
            }
            <form method="dialog" className="modal-backdrop">
                <button onClick={handleModalEdit}>close</button>
            </form>
        </dialog>
    );
}

export default TicketDetailsModal;