import { ArcElement, 
    BarElement,
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

import useTicket from "./useTicket";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement, 
    BarElement,
    Legend, 
    Title, 
    Tooltip,
);

function useChart(token) {

    const [ticketState] = useTicket();

    const [lineChartTicketDetails, setLineChartTicketDetails] = useState({
        open: {},
        inProgress: {},
        resolved : {},
        onHold : {},
        cancelled : {}
    });

    const [barChartTicketDetails, setBarChartTicketDetails] = useState({
        open: {},
        inProgress: {},
        resolved : {},
        onHold : {},
        cancelled : {}
    });

    function setChartDetails() {
        let lineChartTicketList = {
            open: {},
            inProgress: {},
            resolved : {},
            onHold : {},
            cancelled : {}
        };
        let barChartTicketList = {
            open: {'January' : 0, 'February' : 0, 'March' : 0, 'April' : 0, 'May' : 0, 'June' : 0, 'July' : 0, 'August' : 0, 'September' : 0, 'October' : 0, 'November' : 0, 'December' : 0},
            inProgress: {'January' : 0, 'February' : 0, 'March' : 0, 'April' : 0, 'May' : 0, 'June' : 0, 'July' : 0, 'August' : 0, 'September' : 0, 'October' : 0, 'November' : 0, 'December' : 0},
            resolved : {'January' : 0, 'February' : 0, 'March' : 0, 'April' : 0, 'May' : 0, 'June' : 0, 'July' : 0, 'August' : 0, 'September' : 0, 'October' : 0, 'November' : 0, 'December' : 0},
            onHold : {'January' : 0, 'February' : 0, 'March' : 0, 'April' : 0, 'May' : 0, 'June' : 0, 'July' : 0, 'August' : 0, 'September' : 0, 'October' : 0, 'November' : 0, 'December' : 0},
            cancelled : {'January' : 0, 'February' : 0, 'March' : 0, 'April' : 0, 'May' : 0, 'June' : 0, 'July' : 0, 'August' : 0, 'September' : 0, 'October' : 0, 'November' : 0, 'December' : 0},
        };
        let openTicket = {}, inProgressTicket = {}, resolvedTicket = {}, onHoldTicket = {}, cancelledTicket = {};
        let tenDaysBeforeDate = new Date();
        tenDaysBeforeDate = tenDaysBeforeDate.setDate(tenDaysBeforeDate.getDate()-10);
        tenDaysBeforeDate = new Date(tenDaysBeforeDate);
        tenDaysBeforeDate = tenDaysBeforeDate.toISOString().split('T')[0];
        const currDate = new Date().toISOString().split('T')[0];
        for(let i = 9 ; i >= 0 ; i--) {
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
            if(ticket.status == 'open') {
                if(ticket.updatedAt.split('T')[0] > tenDaysBeforeDate && ticket.updatedAt.split('T')[0] <= currDate) openTicket[ticket.updatedAt.split('T')[0]] = openTicket[ticket.updatedAt.split('T')[0]] + 1;
                if(ticket.createdAt.split('T')[0] > tenDaysBeforeDate && ticket.createdAt.split('T')[0] <= currDate) openTicket[ticket.createdAt.split('T')[0]] = openTicket[ticket.createdAt.split('T')[0]] + 1;
            }
            if(ticket.status == 'inProgress') {
                if(ticket.updatedAt.split('T')[0] > tenDaysBeforeDate && ticket.updatedAt.split('T')[0] <= currDate) inProgressTicket[ticket.updatedAt.split('T')[0]] = inProgressTicket[ticket.updatedAt.split('T')[0]] + 1;
                if(ticket.createdAt.split('T')[0] > tenDaysBeforeDate && ticket.createdAt.split('T')[0] <= currDate) inProgressTicket[ticket.createdAt.split('T')[0]] = inProgressTicket[ticket.createdAt.split('T')[0]] + 1;
            }
            if(ticket.status == 'resolved') {
                if(ticket.updatedAt.split('T')[0] > tenDaysBeforeDate && ticket.updatedAt.split('T')[0] <= currDate) resolvedTicket[ticket.updatedAt.split('T')[0]] = resolvedTicket[ticket.updatedAt.split('T')[0]] + 1;
                if(ticket.createdAt.split('T')[0] > tenDaysBeforeDate && ticket.createdAt.split('T')[0] <= currDate) resolvedTicket[ticket.createdAt.split('T')[0]] = resolvedTicket[ticket.createdAt.split('T')[0]] + 1;
            }
            if(ticket.status == 'onHold') {
                if(ticket.updatedAt.split('T')[0] > tenDaysBeforeDate && ticket.updatedAt.split('T')[0] <= currDate) onHoldTicket[ticket.updatedAt.split('T')[0]] = onHoldTicket[ticket.updatedAt.split('T')[0]] + 1;
                if(ticket.createdAt.split('T')[0] > tenDaysBeforeDate && ticket.createdAt.split('T')[0] <= currDate) onHoldTicket[ticket.createdAt.split('T')[0]] = onHoldTicket[ticket.createdAt.split('T')[0]] + 1;
            }
            if(ticket.status == 'cancelled') {
                if(ticket.updatedAt.split('T')[0] > tenDaysBeforeDate && ticket.updatedAt.split('T')[0] <= currDate) cancelledTicket[ticket.updatedAt.split('T')[0]] = cancelledTicket[ticket.updatedAt.split('T')[0]] + 1;
                if(ticket.createdAt.split('T')[0] > tenDaysBeforeDate && ticket.createdAt.split('T')[0] <= currDate) cancelledTicket[ticket.createdAt.split('T')[0]] = cancelledTicket[ticket.createdAt.split('T')[0]] + 1;
            }

            let month = new Date(ticket.createdAt);
            month = month.toLocaleString('default', { month: 'long' });
            if(ticket.status == 'open') {
                barChartTicketList.open[month] +=  1;
            }
            if(ticket.status == 'inProgress') {
                barChartTicketList.inProgress[month]++;
            }
            if(ticket.status == 'resolved') {
                barChartTicketList.resolved[month]++;
            }
            if(ticket.status == 'onHold') {
                barChartTicketList.onHold[month]++;
            }
            if(ticket.status == 'cancelled') {
                barChartTicketList.cancelled[month]++;
            }
        });
        lineChartTicketList.open = openTicket;
        lineChartTicketList.inProgress = inProgressTicket;
        lineChartTicketList.resolved = resolvedTicket;
        lineChartTicketList.onHold = onHoldTicket;
        lineChartTicketList.cancelled = cancelledTicket;
        setLineChartTicketDetails(lineChartTicketList);

        setBarChartTicketDetails(barChartTicketList);
    }

    useEffect(() => {
        setChartDetails();
    }, [token.length, ticketState.ticketList]);

    const pieChartData = {
        labels: ["Open Ticket", "In Progress Ticket", "Resolved Ticket", "On Hold Ticket", "Cancelled Ticket"],
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
        labels: Object.keys(lineChartTicketDetails.open),
        datasets: [
            {
            label: "Open Ticket",
            data: Object.values(lineChartTicketDetails.open),
            borderColor: "#22C55E",
            backgroundColor: "#22C55E",
            },
            {
            label: "In Progress Ticket",
            data: Object.values(lineChartTicketDetails.inProgress),
            fill: true,
            borderColor: "#A855F7",
            backgroundColor: "#A855F7",
            },
            {
            label: "Resolved Ticket",
            data: Object.values(lineChartTicketDetails.resolved),
            fill: true,
            borderColor: "#6B7280",
            backgroundColor: "#6B7280",
            },
            {
            label: "on Hold Ticket",
            data: Object.values(lineChartTicketDetails.onHold),
            fill: true,
            borderColor: "#93C5FD",
            backgroundColor: "#93C5FD",
            },
            {
            label: "Cancelled Ticket",
            data: Object.values(lineChartTicketDetails.cancelled),
            fill: true,
            borderColor: "#FDE047",
            backgroundColor: "#FDE047",
            },
        ]
    };

    const barChartData = {
        labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets : [
            {
                label : "Open Ticket",
                data : Object.values(barChartTicketDetails.open),
                borderColor: "#22C55E",
                backgroundColor: "#22C55E",
            },
            {
                label : "In Progress Ticket",
                data : Object.values(barChartTicketDetails.inProgress),
                borderColor: "#A855F7",
                backgroundColor: "#A855F7",
            },
            {
                label : "Resolved Ticket",
                data : Object.values(barChartTicketDetails.resolved),
                borderColor: "#6B7280",
                backgroundColor: "#6B7280",
            },
            {
                label : "On Hold Ticket",
                data : Object.values(barChartTicketDetails.onHold),
                borderColor: "#93C5FD",
                backgroundColor: "#93C5FD",
            },
            {
                label : "Cancelled Ticket",
                data : Object.values(barChartTicketDetails.cancelled),
                borderColor: "#FDE047",
                backgroundColor: "#FDE047",
            }
        ]
    };

    return [pieChartData, lineChartData, barChartData];
}

export default useChart;