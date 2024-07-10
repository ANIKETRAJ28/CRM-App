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
    const [graphTicketDetails, setgraphTicketDetails] = useState({
        open: {},
        inProgress: {},
        resolved : {},
        onHold : {},
        cancelled : {}
    });

    function setChartDetails() {
        let demoTicketList = {
            open: {},
            inProgress: {},
            resolved : {},
            onHold : {},
            cancelled : {}
        };
        let openTicket = {}, inProgressTicket = {}, resolvedTicket = {}, onHoldTicket = {}, cancelledTicket = {};
        let tenDaysBeforeDate = new Date();
        tenDaysBeforeDate = tenDaysBeforeDate.setDate(tenDaysBeforeDate.getDate()-10);
        tenDaysBeforeDate = new Date(tenDaysBeforeDate);
        tenDaysBeforeDate = tenDaysBeforeDate.toISOString().split('T')[0];
        for(let i = 0 ; i < 10 ; i++) {
            let date = new Date();
            date = date.setDate(date.getDate()-i);
            date = new Date(date);
            openTicket[date.toISOString().split('T')[0]] = 0;
            inProgressTicket[date.toISOString().split('T')[0]] = 0;
            resolvedTicket[date.toISOString().split('T')[0]] = 0;
            onHoldTicket[date.toISOString().split('T')[0]] = 0;
            cancelledTicket[date.toISOString().split('T')[0]] = 0;
        }
        ticketState.downloadTickets.forEach(ticket => {
            if(ticket.status == 'open' && ticket.createdAt.split('T')[0] > tenDaysBeforeDate) {
                openTicket[ticket.createdAt.split('T')[0]] = openTicket[ticket.createdAt.split('T')[0]] + 1;
            }
            if(ticket.status == 'inProgress' && ticket.createdAt.split('T')[0] > tenDaysBeforeDate) {
                inProgressTicket[ticket.createdAt.split('T')[0]] = inProgressTicket[ticket.createdAt.split('T')[0]] + 1;
            }
            if(ticket.status == 'resolved' && ticket.createdAt.split('T')[0] > tenDaysBeforeDate) {
                resolvedTicket[ticket.createdAt.split('T')[0]] = resolvedTicket[ticket.createdAt.split('T')[0]] + 1;
            }
            if(ticket.status == 'onHold' && ticket.createdAt.split('T')[0] > tenDaysBeforeDate) {
                onHoldTicket[ticket.createdAt.split('T')[0]] = onHoldTicket[ticket.createdAt.split('T')[0]] + 1;
            }
            if(ticket.status == 'cancelled' && ticket.createdAt.split('T')[0] > tenDaysBeforeDate) {
                cancelledTicket[ticket.createdAt.split('T')[0]] = cancelledTicket[ticket.createdAt.split('T')[0]] + 1;
            }
        });
        demoTicketList.open = openTicket;
        demoTicketList.inProgress = inProgressTicket;
        demoTicketList.resolved = resolvedTicket;
        demoTicketList.onHold = onHoldTicket;
        demoTicketList.cancelled = cancelledTicket;
        console.log(Object.keys(demoTicketList.open));
        setgraphTicketDetails(demoTicketList);
    }

    useEffect(() => {
        setChartDetails();
    }, [ticketState.downloadTickets]);

    const pieChartData = {
        labels: Object.keys(ticketState.ticketType),
        datasets: [
            {
                lable: "Ticket Data",
                data: Object.values(ticketState.ticketType),
                backgroundColor: ["#22C55E", "#A855F7", "#6B7280", "#93C5FD", "#FDE047"],
                borderColor: ["#22C55E", "#A855F7", "#6B7280", "#93C5FD", "#FDE047"],
            }
        ],
    };

    const lineChartData = {
        labels: Object.keys(graphTicketDetails.open),
        datasets: [
            {
            label: "Open Ticket",
            data: Object.values(graphTicketDetails.open),
            borderColor: "#22C55E",
            backgroundColor: "#22C55E",
            },
            {
            label: "In Progress Ticket",
            data: Object.values(graphTicketDetails.inProgress),
            fill: true,
            borderColor: "#A855F7",
            backgroundColor: "#A855F7",
            },
            {
            label: "Resolved Ticket",
            data: Object.values(graphTicketDetails.resolved),
            fill: true,
            borderColor: "#6B7280",
            backgroundColor: "#6B7280",
            },
            {
            label: "on Hold Ticket",
            data: Object.values(graphTicketDetails.onHold),
            fill: true,
            borderColor: "#93C5FD",
            backgroundColor: "#93C5FD",
            },
            {
            label: "Cancelled Ticket",
            data: Object.values(graphTicketDetails.cancelled),
            fill: true,
            borderColor: "#FDE047",
            backgroundColor: "#FDE047",
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
            <div className='my-8 flex justify-around items-center'>
                <div className='bg-white w-[30%]'>
                    <Pie data={pieChartData}/>
                </div>
                <div className='bg-white w-[60%]'>
                    <Line className='text-white' data={lineChartData}/>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Home;