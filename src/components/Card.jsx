import { useNavigate } from "react-router-dom";

function Card({children, fontColor="text-white", dividerColor="bg-white", borderColor="border-error", background="bg-primary", titleText="card", status = 50, quantity = 50 }) {

    const navigate = useNavigate();
    
    function onCardClick() {
        navigate(`/dashboard?status=${titleText}`);
    }

    return (
        <div onClick={onCardClick} className={`hover:scale-110 transition-all ease-in-out duration-300 border-b-8 ${borderColor} w-64 h-44 ${background} rounded-md flex flex-col justify-center items-center py-2 cursor-pointer`}>
            <div className="text-primary-content text-2xl mb-2">
                {children} <span>{titleText}</span>
            </div>
            <div className={`divider ${dividerColor} h-0.5 mx-4 rounded-sm`}></div>
            <div className="flex justify-around items-center gap-4 mt-2">
                <div className={`text-7xl ${fontColor}`}>
                    {quantity}
                </div>
                <div className={`radial-progress ${fontColor}`} style={{ "--value": (status || 0)*100 }} role="progressbar">
                    {Math.round((status || 0)*100)}%
                </div>
            </div>
        </div>
    );
}

export default Card;