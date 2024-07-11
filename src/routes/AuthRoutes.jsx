import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { MdOutlineFileDownload } from "react-icons/md";
import { useSelector } from "react-redux";
import { usePDF } from "react-to-pdf";

import axiosConfig from "../config/axiosConfig";
import HomeLayout from "../layout/HomeLayout";

function AuthRoutes() {

    const {role, token} = useSelector((state) => state.auth);
    const [user, setUser] = useState([]);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        clientName: '',
        userType: '',
        userStatus: ''
    });

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
            <div>
                <div className="min-h-[90vh] min-w-[90vw] flex flex-col items-center justify-start gap-2">
                    <div className="w-full bg-yellow-500 text-black text-center text-3xl py-4 font-bold hover:bg-yellow-400 transition-all ease-in-out duration-300">
                        User List Records
                        <MdOutlineFileDownload onClick={toPDF} className="inline cursor-pointer"/>
                    </div>
                    {/* table */}
                    <div className="w-[100%]" ref={targetRef}>
                        <DataTable
                            className="cursor-pointer"
                            onRowClicked={(row) => {
                                document.getElementById('my_modal_2').showModal();
                                setUserData({
                                    name: row.name,
                                    email: row.email,
                                    clientName: row.clientName,
                                    userStatus: row.userStatus,
                                    userType: row.userType
                                });
                            }}
                            columns={columns}
                            data={user}
                            customStyles={customStyles}
                        />
                    </div>
                </div>
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-3xl mb-4">User Details</h3>
                        <p className="py-4 text-lg font-semibold">Name : <span className="text-yellow-500">{userData.name}</span></p>
                        <p className="py-4 text-lg font-semibold">Email : <span className="text-yellow-500">{userData.email}</span></p>
                        <p className="py-4 text-lg font-semibold">Client Name : <span className="text-yellow-500">{userData.clientName}</span></p>
                        <p className="py-4 text-lg font-semibold">User Type : <span className="text-yellow-500">{userData.userType}</span></p>
                        <p className="py-4 text-lg font-semibold">User Status : <span className="text-yellow-500">{userData.userStatus}</span></p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        }</HomeLayout>
    );
}

export default AuthRoutes;