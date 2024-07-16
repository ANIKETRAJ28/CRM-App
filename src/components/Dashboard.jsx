import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { MdOutlineFileDownload } from "react-icons/md";
import { usePDF } from 'react-to-pdf';

import useTicket from "../hooks/useTicket";
import HomeLayout from "../layout/HomeLayout";
import TicketDetailsModal from './TicketDetailsModal';

function Dashboard() {

    const [ticketState] = useTicket();
    const [currTicket, setCurrTicket] = useState({});

    const { toPDF, targetRef } = usePDF({filename: 'Ticket-Records.pdf'});
    const columns = [
        {
            name: 'Ticket Id',
            selector: row => row._id,
        },
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Description',
            selector: row => row.description,
        },
        {
            name: 'Reporter',
            selector: row => row.assignee,
        },
        {
            name: 'Priority',
            selector: row => row.ticketPriority,
        },
        {
            name: 'Status',
            selector: row => row.status,
        }
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', // override the row height
                fontSize: '16px'
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                fontSize: '20px'
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };

    return (
        <HomeLayout>
            <div className="min-h-[90vh] min-w-[90vw] flex flex-col items-center justify-start gap-2">
                <div className="w-full text-white text-center text-3xl py-4 font-bold">
                    Ticket Records
                    <MdOutlineFileDownload onClick={toPDF} className="inline cursor-pointer"/>
                </div>
                {/* table */}
                <div className="w-[100%]" ref={targetRef}>
                    {
                        ticketState &&
                        <DataTable
                        className='cursor-pointer'
                            onRowClicked={async (row) => {
                                await setCurrTicket(row);
                                document.getElementById('ticketDetailsModal').showModal();
                            }}
                            columns={columns}
                            data={ticketState.ticketList}
                            customStyles={customStyles}
                        />
                    }
                    <TicketDetailsModal ticket={currTicket} key={currTicket._id}/>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Dashboard;