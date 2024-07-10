import DataTable from 'react-data-table-component';
import { MdOutlineFileDownload } from "react-icons/md";
import { usePDF } from 'react-to-pdf';

import useTicket from "../hooks/useTicket";
import HomeLayout from "../layout/HomeLayout";
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

function Dashboard() {

    const [ticketState] = useTicket();

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
                fontSize: '26.3px'
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                fontSize: '30px'
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
                <div className="w-full bg-yellow-500 text-black text-center text-3xl py-4 font-bold hover:bg-yellow-400 transition-all ease-in-out duration-300">
                    Ticket Records
                    <MdOutlineFileDownload onClick={toPDF} className="inline cursor-pointer"/>
                </div>
                {/* table */}
                <div ref={targetRef}>
                    {
                        ticketState &&
                        <DataTable
                            columns={columns}
                            data={ticketState.ticketList}
                            expandableRows
                            expandableRowsComponent={ExpandedComponent}
                            customStyles={customStyles}
                        />
                    }
                </div>
            </div>
        </HomeLayout>
    );
}

export default Dashboard;