import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import axiosConfig from "../config/axiosConfig";

function UserModal({userData, resetUsers}) {

    const [user, setUser] = useState(userData);

    useEffect(() => {
        setUser(userData);
    }, [userData.userStatus]);

    async function userUpdate(type, e) {
        try {
            const dropDown = document.getElementById(type+'Dropdown');
            const response = await axiosConfig.patch('user/updateUser', {
                userId: userData.userId,
                updates: {
                    ...userData,
                    [type]: e.target.textContent
                }
            }, {
                headers: {
                    'x-access-token': localStorage.getItem('token')                
                },
            });
            resetUsers();
            if(response?.data?.result) {
                dropDown.open = !dropDown.open;
                document.getElementById(type).innerText = e.target.textContent;
                toast.success("Successfully updated the user");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }

    return (
        <dialog id="user-details-modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-xl mb-4">User Details</h3>
                <p className="py-4 text-sm font-semibold">Name : <span className="text-yellow-500">{user.name}</span></p>
                <p className="py-4 text-sm font-semibold">Email : <span className="text-yellow-500">{user.email}</span></p>
                <p className="py-4 text-sm font-semibold">Client Name : <span className="text-yellow-500">{user.clientName}</span></p>
                <p className="py-4 text-sm font-semibold">User Status : <span className="text-yellow-500">
                    <details className="dropdown ml-2" id="userStatusDropdown">
                            <summary id="userStatus" className="m-1 btn">{user.userStatus}</summary>
                            <ul name="userStatus" onClick={(e) => userUpdate("userStatus", e)} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                <li><a>approved</a></li>
                                <li><a>suspended</a></li>
                                <li><a>rejected</a></li>
                            </ul>
                        </details>
                    </span>
                </p>
                <p className="py-4 text-sm font-semibold">User Type : 
                    <span className="text-yellow-500">
                        <details className="dropdown ml-2" id="userTypeDropdown">
                            <summary id="userType" className="m-1 btn">{user.userType}</summary>
                            <ul name="userType" onClick={(e) => userUpdate("userType", e)} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                <li><a>customer</a></li>
                                <li><a>engineer</a></li>
                                <li><a>admin</a></li>
                            </ul>
                        </details>
                    </span>
                </p>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default UserModal;