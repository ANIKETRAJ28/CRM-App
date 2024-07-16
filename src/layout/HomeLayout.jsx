import { useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logoutAuth } from "../Redux/Slices/AuthSlice";
import { logoutTicket } from "../Redux/Slices/TicketSlice";

function HomeLayout({ children }) {

    const authState = useSelector((state) => state.auth);
    const ticketState = useSelector((state) => state.tickets);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!authState.isloggedIn) navigate("/login");
    });

    function onLogout() {
        dispatch(logoutAuth(authState));
        dispatch(logoutTicket(ticketState));
        navigate("/login");
    }

    return (
        <div className="sticky min-h-[100vh]">
            <div className="drawer absolute left-0 right-0 cursor-pointer mt-4 ml-4">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer">
                        <IoMenu
                            size={'32px'}
                            className="cursor-pointer"
                        />
                    </label>
                </div>
                <div className="drawer-side z-10">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 relative">
                        <li className="text-2xl mb-2 "><h3>Hey! {authState.data.name} 👋</h3></li>
                    {authState.role === 'admin' && <li><Link to={'/dashboard?status=AllTickets'}>View All Tickets</Link></li>}
                    {authState.role === 'admin' && <li><Link to="/users">Users</Link></li>}
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    {authState.role === 'customer' && <li><Link to="/createTicket">Create Ticket</Link></li>}
                    <li className="absolute bottom-4 w-[90%]">
                        <div className="flex justify-between">
                            {
                                !authState.isloggedIn ? (
                                    <>
                                        <Link to="/login"><button className="border-none btn btn-xs sm:btn-sm md:btn-md font-bold bg-white text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-all ease-in-out duration-300">Login</button></Link>
                                        <Link to="/signup"><button className="border-none btn btn-xs sm:btn-sm md:btn-md font-bold bg-white text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-all ease-in-out duration-300">Sign Up</button></Link>
                                    </>
                                ) :
                                (
                                    <>
                                        <button onClick={onLogout} className="border-none btn btn-xs sm:btn-sm md:btn-md font-bold bg-white text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-all ease-in-out duration-300">Logout</button>
                                        <Link><button className="border-none btn btn-xs sm:btn-sm md:btn-md font-bold bg-white text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-all ease-in-out duration-300">Profile</button></Link>
                                    </>
                                )
                            }
                        </div>
                    </li>
                    </ul>
                </div>
            </div>

            <div className="flex items-start justify-center">
                <div className="w-[90vw] mt-12">
                    {children}
                </div>
            </div>
        </div>

    );
}

export default HomeLayout;