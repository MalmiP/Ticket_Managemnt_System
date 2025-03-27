import React, {useEffect, useState} from "react";
import axios from "../api/axios";
import {Card, Typography} from "@material-tailwind/react";
import {Alert, BarChart, Button} from "./webcomponent";

const System = () => {

    const [totalTickets, setTotalTickets] = useState(0);
    const [ticketReleaseRate, setTicketReleaseRate] = useState(0);
    const [customerRetrievalRate, setCustomerRetrievalRate] = useState(0);
    const [maxTicketCapacity, setMaxTicketCapacity] = useState(0);
    const [vendorCount, setVendorCount] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);

    const [errorMsg, setErrorMsg] = useState({State: false, Type: "", Message: ""});
    const [successMsg, setSuccessMsg] = useState({State: false, Type: "", Message: ""});

    const [init, setInit] = useState(true);

    useEffect( () => {

        const fetchData = async () => {
            let response = await axios.get('/config/retrieve',
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true,

                }
            );

            if (
                response.data.totalTickets !== 0 ||
                response.data.ticketReleaseRate !== 0 ||
                response.data.customerRetrievalRate !== 0 ||
                response.data.maxTicketCapacity !== 0 ||
                response.data.vendorCount !== 0 ||
                response.data.customerCount !== 0
            ) {
                setTotalTickets(response.data.totalTickets);
                setTicketReleaseRate(response.data.ticketReleaseRate);
                setCustomerRetrievalRate(response.data.customerRetrievalRate);
                setMaxTicketCapacity(response.data.maxTicketCapacity);
                setVendorCount(response.data.vendorCount);
                setCustomerCount(response.data.customerCount);
                setInit(false);
            }

        }

        fetchData().then();

    }, [])

    useEffect(() => {
        setTimeout(() => {
            setSuccessMsg({State: false, Type: "", Message: ""});
        }, 10000);
    }, [successMsg])

    const handleSubmit = async (e) => {

        if ([ticketReleaseRate, customerRetrievalRate, maxTicketCapacity, vendorCount, customerCount].includes(0)) {
            setErrorMsg({State: true, Type: "Error", Message: 'All fields must be greater than 0'});
            return;
        }

        e.preventDefault();

        try {

            let response = await axios.post('/config/setup',
                JSON.stringify({totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity, vendorCount, customerCount}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true,

                }
            );

            let cnt = [];
            let vendors = [];
            for (let i = 0; i < vendorCount; i++) {
                cnt.push(0);
                vendors.push("Vendor " + (i + 1));
            }

            setGraph({data: cnt, categories: vendors});

            setSuccessMsg({State: true, Type: "Success", Message: "Successfully Saved Configurations"});
            setInit(false);

        } catch (err) {
            if (!err?.response) {
                setErrorMsg({State: true, Type: "Error", Message: 'No Server Response'});
            } else if (err.response?.status === 403) {
                setErrorMsg({State: true, Type: "Error", Message: 'Invalid Inputs'});
            } else {
                setErrorMsg({State: true, Type: "Error", Message: err.response?.data?.message});
            }
        }
    }

    const startSystem = async () => {
        try {
            let response = await axios.get('/system/start', {
                withCredentials: true,
            });

            setSuccessMsg({State: true, Type: "Success", Message: response?.data});
            setState("Start");

        } catch (err) {
            if (!err?.response) {
                setErrorMsg({State: true, Type: "Error", Message: 'No Server Response'});
            } else {
                setErrorMsg({State: true, Type: "Error", Message: err.response?.data?.message});
            }
        }
    }

    const stopSystem = async () => {
        try {
            let response = await axios.get('/system/stop', {
                withCredentials: true,
            });

            setSuccessMsg({State: true, Type: "Success", Message: response?.data});
            setState("Stop");

        } catch (err) {
            if (!err?.response) {
                setErrorMsg({State: true, Type: "Error", Message: 'No Server Response'});
            } else {
                setErrorMsg({State: true, Type: "Error", Message: err.response?.data?.message});
            }
        }
    }

    const [state, setState] = useState("");
    const [graph, setGraph] = useState({"data": [], "categories": []});

    const fetchTck = async () => {
        let response = await axios.get('/ticketPool/retrieve',
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true,

            }
        );

        let vendorTicketCount = [];

        for (let i = 0; i < vendorCount; i++) {
            vendorTicketCount.push(graph.data[i]);
        }

        for (let i = 0; i < vendorCount; i++) {
            response.data.tickets.forEach((ticket) => {
                if (ticket.vendorId === i) {
                    vendorTicketCount[i] += 1;
                }
            });
        }

        setGraph({data: vendorTicketCount, categories: graph.categories});

    }

    useEffect(() => {

        let intervalId;

        const startFetchingLogs = async () => {
            if (state === "Start") {
                await fetchTck();
                intervalId = setInterval(fetchTck, 1000);
            }
        };

        startFetchingLogs().then();

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [state]);

    const barchart={
        chart1:{
            label:"Vendor Ticket Count",
            series:[{
                name:"Ticket Count",
                data:graph.data
            }],
            colors:["#00CED9", "#1AE3B5", "#9CF28B"],
            dataLabels:graph.categories
        }
    }

    return (

        <>
            <Alert Type={successMsg.Type} Message={successMsg.Message} State={successMsg.State}/>
            <Alert Type={errorMsg.Type} Message={errorMsg.Message} State={errorMsg.State}/>

            <div className="flex flex-row px-[10rem] mt-0 w-full overflow-hidden">
                <section
                    className="flex flex-col gap-10 items-start justify-items-start md:space-y-0 md:space-x-16 md:mx-0 m-20 lg:my-[5rem] w-2/5">
                    <div className="my-130">
                        <Card color="transparent" className="items-left lg:items-start" shadow={false}>
                            <Typography variant="h4" className="text-[2rem] text-700 text-black">
                                Ticketing System - Configurations
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-8 items-left mt-4">
                                    <div className={"flex flex-row gap-4 items-center"}>
                                        <div className="flex flex-col gap-4 justify-center items-center border-2 border-black p-4 rounded-[1rem] w-auto">
                                            <Typography variant="h6" className="text-700 !text-Black !w-max">
                                                Total Tickets
                                            </Typography>
                                            <div className="flex flex-row gap-2 items-center">
                                                <Button
                                                    type="button"
                                                    label="-"
                                                    className="w-[2rem] px-5 !bg-black hover:!bg-black hover:!bg-opacity-50 hover:!text-white !rounded-full"
                                                    onClick={() => {
                                                        totalTickets > 0 && setTotalTickets(totalTickets - 1);
                                                    }}
                                                />
                                                <div>{totalTickets}</div>
                                                <Button
                                                    type="button"
                                                    label="+"
                                                    className="w-[2rem] px-5 !bg-black hover:!bg-black hover:!bg-opacity-50 hover:!text-white !rounded-full"
                                                    onClick={() => {
                                                        setTotalTickets(totalTickets + 1);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 justify-center items-center border-2 border-black p-4 rounded-[1rem] w-auto">
                                            <Typography variant="h6" className="text-700 !text-Black !w-max">
                                                Ticket Release Rate
                                            </Typography>
                                            <div className="flex flex-row gap-2 items-center">
                                                <Button
                                                    type="button"
                                                    label="-"
                                                    className="w-[2rem] px-5 !bg-black hover:!bg-black hover:!bg-opacity-50 hover:!text-white !rounded-full"
                                                    onClick={() => {
                                                        ticketReleaseRate > 0 && setTicketReleaseRate(ticketReleaseRate - 1);
                                                    }}
                                                />
                                                <div>{ticketReleaseRate}</div>
                                                <Button
                                                    type="button"
                                                    label="+"
                                                    className="w-[2rem] px-5 !bg-black hover:!bg-black hover:!bg-opacity-50 hover:!text-white !rounded-full"
                                                    onClick={() => {
                                                        setTicketReleaseRate(ticketReleaseRate + 1);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 justify-center items-center border-2 border-black p-4 rounded-[1rem] w-auto">
                                            <Typography variant="h6" className="text-700 !text-Black !w-max">
                                                Customer Retrieval Rate
                                            </Typography>
                                            <div className="flex flex-row gap-2 items-center">
                                                <Button
                                                    type="button"
                                                    label="-"
                                                    className="w-[2rem] px-5 !bg-black hover:!bg-black hover:!bg-opacity-50 hover:!text-white !rounded-full"
                                                    onClick={() => {
                                                        customerRetrievalRate > 0 && setCustomerRetrievalRate(customerRetrievalRate - 1);
                                                    }}
                                                />
                                                <div>{customerRetrievalRate}</div>
                                                <Button
                                                    type="button"
                                                    label="+"
                                                    className="w-[2rem] px-5 !bg-black hover:!bg-black hover:!bg-opacity-50 hover:!text-white !rounded-full"
                                                    onClick={() => {
                                                        setCustomerRetrievalRate(customerRetrievalRate + 1);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 justify-center items-center border-2 border-black p-4 rounded-[1rem] w-auto">
                                            <Typography variant="h6" className="text-700 !text-Black !w-max">
                                                Max Ticket Capacity
                                            </Typography>
                                            <div className="flex flex-row gap-2 items-center">
                                                <Button
                                                    type="button"
                                                    label="-"
                                                    className="w-[2rem] px-5 !bg-black hover:!bg-black hover:!bg-opacity-50 hover:!text-white !rounded-full"
                                                    onClick={() => {
                                                        maxTicketCapacity > 0 && setMaxTicketCapacity(maxTicketCapacity - 1);
                                                    }}
                                                />
                                                <div>{maxTicketCapacity}</div>
                                                <Button
                                                    type="button"
                                                    label="+"
                                                    className="w-[2rem] px-5 !bg-black hover:!bg-black hover:!bg-opacity-50 hover:!text-white !rounded-full"
                                                    onClick={() => {
                                                        setMaxTicketCapacity(maxTicketCapacity + 1);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 justify-center items-center border-2 border-black p-4 rounded-[1rem] w-auto">
                                            <Typography variant="h6" className="text-700 !text-Black !w-max">
                                                Vendor Count
                                            </Typography>
                                            <div className="flex flex-row gap-2 items-center">
                                                <Button
                                                    type="button"
                                                    label="-"
                                                    className="w-[2rem] px-5 !bg-black hover:!bg-black hover:!bg-opacity-50 hover:!text-white !rounded-full"
                                                    onClick={() => {
                                                        vendorCount > 0 && setVendorCount(vendorCount - 1);
                                                    }}
                                                />
                                                <div>{vendorCount}</div>
                                                <Button
                                                    type="button"
                                                    label="+"
                                                    className="w-[2rem] px-5 !bg-black hover:!bg-black hover:!bg-opacity-50 hover:!text-white !rounded-full"
                                                    onClick={() => {
                                                        setVendorCount(vendorCount + 1);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 justify-center items-center border-2 border-black p-4 rounded-[1rem] w-auto">
                                            <Typography variant="h6" className="text-700 !text-Black !w-max">
                                                Customer Count
                                            </Typography>
                                            <div className="flex flex-row gap-2 items-center">
                                                <Button
                                                    type="button"
                                                    label="-"
                                                    className="w-[2rem] px-5 !bg-black hover:!bg-black hover:!bg-opacity-50 hover:!text-white !rounded-full"
                                                    onClick={() => {
                                                        customerCount > 0 && setCustomerCount(customerCount - 1);
                                                    }}
                                                />
                                                <div>{customerCount}</div>
                                                <Button
                                                    type="button"
                                                    label="+"
                                                    className="w-[2rem] px-5 !bg-black hover:!bg-black hover:!bg-opacity-50 hover:!text-white !rounded-full"
                                                    onClick={() => {
                                                        setCustomerCount(customerCount + 1);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            type="Save Configurations"
                                            label="Save Configurations"
                                            className="w-1/2 !bg-black hover:!bg-black hover:!bg-opacity-80 hover:!text-white font-bold text-[1rem]"
                                        />
                                    </div>
                                </div>
                            </form>
                        </Card>
                    </div>
                    <div className="my-130 !m-0">
                        <Card color="transparent" className="items-left lg:items-start" shadow={false}>
                            <Typography variant="h4" className="text-[2rem] text-700 text-black">
                                Ticketing System - Commands
                            </Typography>
                            <div className="flex flex-row gap-8 items-left mt-4 w-full justify-start items-start">
                                <Button
                                    type="button"
                                    label="Start"
                                    className="w-[8rem] h-[8rem] font-bold text-[1.5rem] !bg-black hover:!bg-black hover:!bg-opacity-50 hover:!text-white"
                                    disabled={init}
                                    onClick={() => {
                                        startSystem()
                                    }}
                                />
                                <Button
                                    type="button"
                                    label="End"
                                    className="w-[8rem] h-[8rem] font-bold text-[1.5rem] !bg-black hover:!bg-black hover:!bg-opacity-50 hover:!text-white"
                                    disabled={init}
                                    onClick={() => {
                                        stopSystem()
                                    }}
                                />
                            </div>
                        </Card>
                    </div>
                    <div className="my-130 !m-0 w-full">
                        <Card color="transparent" className="items-left lg:items-start w-max" shadow={false}>
                            <Typography variant="h4" className="text-[2rem] text-700 text-white">
                                Data
                            </Typography>
                            <div className="w-full bg-white rounded-lg border-[1px] p-4 md:p-6">
                                <div className="flex flex-col gap-[0.2rem] border-gray-200 border-b py-2">
                                    <div>
                                        <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                            Ticket Count Added by a Vendor Per Second
                                        </h5>
                                    </div>
                                </div>
                                <BarChart data={barchart.chart1}/>
                            </div>
                        </Card>
                    </div>
                </section>

            </div>
        </>
    )

}

export default System