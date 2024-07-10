import { ArcElement, 
    CategoryScale,
    Chart as ChartJS,
    Legend, 
    LinearScale,
    LineElement,
    PointElement,
    Title, 
    Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line, Pie } from "react-chartjs-2";
import { FaRegFolderOpen } from "react-icons/fa";
import { MdDoneAll, MdOutlineCancel, MdOutlinePending } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";

import Card from "../../components/Card";
import useTicket from "../../hooks/useTicket";
import HomeLayout from "../../layout/HomeLayout";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement, 
    Legend, 
    Title, 
    Tooltip,
);

function Home() {

    const [ticketState] = useTicket();
    const [openTicket, setOpenTicket] = useState({});

    useEffect(() => {
        let ticketOpen = {};
        ticketState.downloadTickets.forEach(ticket => {
            if(ticket.status == 'open') {
                if(ticketOpen[ticket.createdAt.split('T')[0]] == undefined) ticketOpen[ticket.createdAt.split('T')[0]] = 1;
                else ticketOpen[ticket.createdAt.split('T')[0]] = ticketOpen[ticket.createdAt.split('T')[0]] + 1;
                // ticketOpen[ticket.createdAt.split('T')[0]] ? ticketOpen[ticket.createdAt.split('T')[0]] = ticketOpen[ticket.createdAt.split('T')[0]] + 1 : 1;
            }
        });
        setOpenTicket(ticketOpen);
    }, [ticketState.downloadTickets]);

    const pieChartData = {
        labels: Object.keys(ticketState.ticketType),
        datasets: [
            {
                lable: "Ticket Data",
                data: Object.values(ticketState.ticketType),
                backgroundColor: ["green", "purple", "grey", "blue", "yellow"],
                borderColor: ["green", "purple", "grey", "blue", "yellow"],
            }
        ],
    };

    const lineChartData = {
        labels: Object.keys(openTicket),
        datasets: [
          {
            label: "Open Ticket Data",
            data: Object.values(openTicket),
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          },
        ]
      };

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
            <div className='w-80 h-80'>
                <Pie data={pieChartData}/>
            </div>
            <div className='w-80 h-80'>
                <Line data={lineChartData}/>
            </div>
        </HomeLayout>
    );
}

export default Home;