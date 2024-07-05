function SignUp() {
    return (
        <div className="flex justify-center items-center h-[90vh]">
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body flex flex-col items-center">
                    <div className="w-full flex justify-center">
                        <h2 className="card-title text-4xl text-white">Login</h2>
                    </div>
                    <div className="w-full">
                        <input autoComplete="one-time-code" type="text" placeholder="User Id..." className="input input-bordered w-full max-w-xs text-white"/>
                    </div>
                    <div className="w-full">
                        <input autoComplete="one-time-code" type="email" placeholder="Email..." className="input input-bordered w-full max-w-xs text-white"/>
                    </div>
                    <div className="w-full">
                        <input autoComplete="one-time-code" type="password" placeholder="Password..." className="input input-bordered w-full max-w-xs text-white"/>
                    </div>
                    <details className="dropdown text-white w-full">
                        <summary className="btn">User Type</summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><a>Customer</a></li>
                            <li><a>Engineer</a></li>
                        </ul>
                    </details>
                    <div className="w-full card-actions mt-4">
                        <button className="btn btn-xs sm:btn-sm md:btn-md w-full font-bold">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;