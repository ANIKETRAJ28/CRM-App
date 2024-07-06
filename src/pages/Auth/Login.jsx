import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../../Redux/Slices/AuthSlice";

function Login() {

    const dispatch = useDispatch();
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    async function onSubmit() {
        if(!loginDetails.email || !loginDetails.password) return;
        const response = await dispatch(login(loginDetails));
        setLoginDetails({email: "",password: ""});
        if(response.payload) navigate("/");
    }

    function setValue(e) {
        setLoginDetails({...loginDetails, [e.target.name]: e.target.value});
    }

    return (
        <div className="flex justify-center items-center h-[90vh]">
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body flex flex-col items-center">
                    <div className="w-full flex justify-center">
                        <h2 className="card-title text-4xl text-white">Login</h2>
                    </div>
                    <div className="w-full">
                        <input onChange={(e) => setValue(e)} value={loginDetails.email} name="email" autoComplete="one-time-code" type="text" placeholder="Email..." className="input input-bordered w-full max-w-xs text-white"/>
                    </div>
                    <div className="w-full">
                        <input onChange={(e) => setValue(e)} value={loginDetails.password} name="password" autoComplete="one-time-code" type="password" placeholder="Password..." className="input input-bordered w-full max-w-xs text-white"/>
                    </div>
                    <div className="w-full card-actions mt-4">
                    <button onClick={onSubmit} className="btn btn-xs sm:btn-sm md:btn-md w-full font-bold">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;