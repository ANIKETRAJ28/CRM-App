function Login() {
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
                        <input autoComplete="one-time-code" type="password" placeholder="Password..." className="input input-bordered w-full max-w-xs text-white"/>
                    </div>
                    <div className="w-full card-actions mt-4">
                    <button className="btn btn-xs sm:btn-sm md:btn-md w-full font-bold">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;