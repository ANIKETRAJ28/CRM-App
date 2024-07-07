import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { signUp } from "../../Redux/Slices/AuthSlice";


function SignUp() {

    const dispatch = useDispatch();
    const [signupDetails, setSignupDetails] = useState({
        name: "",
        email: "",
        password: "",
        clientName: "",
        userType: "",
        userStatus: ""
    });
    const navigate = useNavigate();

    function onUserChange(user) {
        setSignupDetails({...signupDetails, 
            userType: user, 
            userStatus : (user === 'customer') ?  "approved" : "suspended"
        });
        const dropDown = document.getElementById("user-type-dropdown");
        dropDown.open = !dropDown.open;
    }

    function resetSignUpForm() {
        setSignupDetails({
            name: "",
            email: "",
            password: "",
            clientName: "",
            userType: "",
            userStatus: ""
        });
    }

    async function onSubmit() {
        if(!signupDetails.email || 
            !signupDetails.name ||
            !signupDetails.password ||
            !signupDetails.userStatus ||
            !signupDetails.userType ||
            !signupDetails.clientName
        ) return;
        const response = await dispatch(signUp(signupDetails));
        resetSignUpForm();
        if(response.payload) navigate("/login");
    }

    function setValue(e) {
        setSignupDetails({...signupDetails, [e.target.name]: e.target.value});
    }

    return (
        <div className="flex justify-center items-center h-[90vh]">
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body flex flex-col items-center">
                    <div className="w-full flex justify-center">
                        <h2 className="card-title text-4xl text-white">Sign Up</h2>
                    </div>
                    <div className="w-full">
                        <input onChange={(e) => setValue(e)} value={signupDetails.email} name="email" autoComplete="one-time-code" type="email" placeholder="Email..." className="input input-bordered w-full max-w-xs text-white"/>
                    </div>
                    <div className="w-full">
                        <input onChange={(e) => setValue(e)} value={signupDetails.name} name="name" autoComplete="one-time-code" type="text" placeholder="Name..." className="input input-bordered w-full max-w-xs text-white"/>
                    </div>
                    <div className="w-full">
                    <input onChange={(e) => setValue(e)} value={signupDetails.password} name="password" autoComplete="one-time-code" type="password" placeholder="Password..." className="input input-bordered w-full max-w-xs text-white"/>
                    </div>
                    <div className="w-full">
                        <input onChange={(e) => setValue(e)} value={signupDetails.clientName} name="clientName" autoComplete="one-time-code" type="clientName" placeholder="Client Name..." className="input input-bordered w-full max-w-xs text-white"/>
                    </div>
                    <details className="dropdown text-white w-full" id="user-type-dropdown">
                        <summary className="btn">{!signupDetails.userType ? "User Type" : signupDetails.userType}</summary>
                        <ul onClick={(e) => onUserChange(e.target.innerText)} className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a>customer</a></li>
                            <li><a>engineer</a></li>
                            <li><a>admin</a></li>
                        </ul>
                    </details>
                    <div className="w-full card-actions mt-4">
                        <button onClick={onSubmit} className="border-none btn btn-xs sm:btn-sm md:btn-md w-full font-bold bg-white text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-all ease-in-out duration-300">Submit</button>
                    </div>
                    <p className="font-semibold">Already have an account ? <Link className="text-red-100 hover:text-white" to="/login">Login Here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;