import { useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../Redux/Slices/AuthSlice";

function HomeLayout({ children }) {

    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!authState.isloggedIn) navigate("/login");
    }, []);

    function onLogout() {
        dispatch(logout(authState));
        navigate("/login");
    }

    return (
        <div className="min-h-[90vh]">
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
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 relative">
                    <li><a>View All Tickets</a></li>
                    <li><a>Dashboard</a></li>
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
                <div className="w-3/4">
                    {children}
                </div>
            </div>
        </div>

    );
}

export default HomeLayout;