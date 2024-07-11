import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineFileDownload } from "react-icons/md";
import { useSelector } from "react-redux";
import { usePDF } from "react-to-pdf";

import axiosConfig from "../config/axiosConfig";
import HomeLayout from "../layout/HomeLayout";

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

function AuthRoutes() {

    const {role, token} = useSelector((state) => state.auth);
    const [user, setUser] = useState([]);

    async function getUsers() {
        const response = await axiosConfig.get('/users', {
            headers: {
                'x-access-token' : token
            }
        });
        setUser(response.data.result);
    }

    useEffect(() => {
        if(role !== 'admin') return;
        getUsers();
    }, []);

    const { toPDF, targetRef } = usePDF({filename: 'Ticket-Records.pdf'});
    const columns = [
        {
            name: 'User Name',
            selector: row => row.name,
        },
        {
            name: 'User Email',
            selector: row => row.email,
        },
        {
            name: 'Client Name',
            selector: row => row.clientName,
        },
        {
            name: 'Type',
            selector: row => row.userType,
        },
        {
            name: 'Client Name',
            selector: row => row.clientName,
        },
        {
            name: 'Status',
            selector: row => row.userStatus,
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
        <HomeLayout>{
            role === 'admin' && 
            <div className="min-h-[90vh] min-w-[90vw] flex flex-col items-center justify-start gap-2">
                <div className="w-full bg-yellow-500 text-black text-center text-3xl py-4 font-bold hover:bg-yellow-400 transition-all ease-in-out duration-300">
                    Ticket Records
                    <MdOutlineFileDownload onClick={toPDF} className="inline cursor-pointer"/>
                </div>
                {/* table */}
                <div className="w-[100%]" ref={targetRef}>
                    <DataTable
                        columns={columns}
                        data={user}
                        expandableRows
                        expandableRowsComponent={ExpandedComponent}
                        customStyles={customStyles}
                    />
                </div>
            </div>
        }</HomeLayout>
    );
}

export default AuthRoutes;