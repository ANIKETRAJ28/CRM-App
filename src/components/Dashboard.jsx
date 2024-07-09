import { MdOutlineFileDownload } from "react-icons/md";
import { usePDF } from 'react-to-pdf';

import useTicket from "../hooks/useTicket";
import HomeLayout from "../layout/HomeLayout";

function Dashboard() {

    const [ticketState] = useTicket();

    const { toPDF, targetRef } = usePDF({filename: 'Ticket-Records.pdf'});

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col items-center justify-center gap-2">
                <div className="w-full bg-yellow-500 text-black text-center text-3xl py-4 font-bold hover:bg-yellow-400 transition-all ease-in-out duration-300">
                    Ticket Records
                    <MdOutlineFileDownload onClick={toPDF} className="inline cursor-pointer"/>
                </div>
                {/* table */}
                <div className="flex flex-col w-full justify-start" ref={targetRef}>
                    {/* table row */}
                    <div className="flex py-2 my-3 bg-purple-900 overflow-auto no-scrollbar">
                        <div className="table-title basis-[15%] text-start min-w-24">Ticket Id</div>
                        <div className="table-title basis-[20%] min-w-32">Title</div>
                        <div className="table-title basis-[30%] min-w-32">Description</div>
                        <div className="table-title basis-[25%] min-w-32">Reporter</div>
                        <div className="table-title basis-[5%]">Priority</div>
                        <div className="table-title basis-[15%] text-end min-w-24">Status</div>
                    </div>
                    {/* ticket details */}
                    {ticketState && ticketState.ticketList.map(ticket => {
                        return (
                            <div key={ticket.id} className="my-1 flex gap-2 bg-indigo-900 hover:bg-indigo-950 transition-all ease-in-out duration-300 overflow-auto no-scrollbar">
                                <div className="table-title basis-[15%] truncate text-start font-normal min-w-24">{ticket._id}</div>
                                <div className="table-title basis-[20%] truncate text-start font-normal min-w-32">{ticket.title}</div>
                                <div className="table-title basis-[30%] truncate text-start font-normal min-w-32">{ticket.description}</div>
                                <div className="table-title basis-[25%] truncate text-start font-normal min-w-32">{ticket.assignee}</div>
                                <div className="table-title basis-[5%] truncate text-start font-normal">{ticket.ticketPriority}</div>
                                <div className="table-title basis-[15%] truncate text-end font-normal min-w-24">{ticket.status}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </HomeLayout>
    );
}

export default Dashboard;