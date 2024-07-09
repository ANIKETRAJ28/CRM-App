import { FaRegFolderOpen } from "react-icons/fa";
import { MdDoneAll, MdOutlineCancel, MdOutlinePending } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";

import Card from "../../components/Card";
import useTicket from "../../hooks/useTicket";
import HomeLayout from "../../layout/HomeLayout";

function Home() {

    const [ticketState] = useTicket();

    return (
        <HomeLayout>
            <div className="flex flex-wrap justify-center items-center gap-4">
                <Card titleText="Open" quantity={ticketState.ticketType.open} status={ticketState.ticketType.open/ticketState.downloadTickets.length} background="bg-green-500" borderColor="border-green-700" fontColor="text-black" dividerColor="bg-black">
                    <FaRegFolderOpen className="inline mr-2"/>
                </Card>
                <Card titleText="In Progress" quantity={ticketState.ticketType.inProgress} status={ticketState.ticketType.inProgress/ticketState.downloadTickets.length} background="bg-purple-500" borderColor="border-purple-700" fontColor="text-black" dividerColor="bg-black">
                    <TbProgressBolt className="inline mr-2"/>
                </Card>
                <Card titleText="Resolved" quantity={ticketState.ticketType.resolved} status={ticketState.ticketType.resolved/ticketState.downloadTickets.length} background="bg-gray-500" borderColor="border-gray-700" fontColor="text-black" dividerColor="bg-black">
                    <MdDoneAll className="inline mr-2"/>
                </Card>
                <Card titleText="On Hold" quantity={ticketState.ticketType.onHold} status={ticketState.ticketType.onHold/ticketState.downloadTickets.length} background="bg-blue-300" borderColor="border-blue-500" fontColor="text-black" dividerColor="bg-black">
                    <MdOutlinePending className="inline mr-2"/>
                </Card>
                <Card titleText="Cancelled" quantity={ticketState.ticketType.cancelled} status={ticketState.ticketType.cancelled/ticketState.downloadTickets.length} background="bg-yellow-300" borderColor="border-yellow-500" fontColor="text-black" dividerColor="bg-black">
                    <MdOutlineCancel className="inline mr-2"/>
                </Card>
            </div>
        </HomeLayout>
    );
}

export default Home;