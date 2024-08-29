"use client";

import React, { useRef, useEffect, useState } from "react";
import mqtt from "mqtt";
import { Chart } from "chart.js/auto";
import axios from "axios";

const MAX_DATA_POINTS = 5; // Number of data points to display

const LinePlot = () => {
    const chartRef = useRef(null);
    const [kecepatan, setKecepatan] = useState([]);
    const [time, setTime] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const brokerUrl = "wss://broker.emqx.io:8084/mqtt";
        const options = {
            clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
            keepAlive: 60,
            clean: true,
            reconnectPeriod: 1000,
            connectTimeout: 30 * 1000,
        };

        const client = mqtt.connect(brokerUrl, options);

        const onConnect = () => {
            console.log("Connected to MQTT Broker");
            client.subscribe("ely-can-sub/1", (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Subscribed to topic: ely-can-sub/1");
                }
            });
        };

        const onMessage = async (topic, message) => {
            console.log(`Line Received message from ${topic}: ${message.toString()}`);
            try {
                const data = JSON.parse(message);
                const newKecepatan = data.Kecepatan !== null ? data.Kecepatan.toFixed(2) : null;

                if (newKecepatan !== null) {
                    setKecepatan((prevKecepatan) => {
                        const updatedKecepatan = [...prevKecepatan, newKecepatan];
                        return updatedKecepatan.slice(-MAX_DATA_POINTS); // Keep only the last MAX_DATA_POINTS
                    });
                }
            } catch (err) {
                console.error("Failed to parse JSON:", err);
            }
        };

        client.on("connect", onConnect);
        client.on("message", onMessage);

        return () => {
            client.end(); // Clean up the MQTT connection on component unmount
        };
    }, []);

    useEffect(() => {
        const getTime = async () => {
            try {
                const response = await axios.get("http://localhost:5050/get_time");
                const newTime = response.data.time;

                if (newTime) {
                    setTime((prevTime) => {
                        const updatedTime = [...prevTime, newTime];
                        return updatedTime.slice(-MAX_DATA_POINTS); // Keep only the last MAX_DATA_POINTS
                    });
                }
            } catch (err) {
                setError(err.message);
            }
        };

        getTime();
        const interval = setInterval(getTime, 2000); // Poll every 2 seconds

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            if (!chartRef.current.chart) {
                const context = chartRef.current.getContext("2d");

                chartRef.current.chart = new Chart(context, {
                    type: "line",
                    data: {
                        labels: time, // sumbu x
                        datasets: [
                            {
                                label: "Kecepatan",
                                data: kecepatan, // sumbu y
                                backgroundColor: "rgba(255, 99, 132, 0.2)",
                                borderColor: "rgb(255, 99, 132)",
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            x: {
                                type: "category", // Use "category" for time as an array of strings
                                title: {
                                    display: true,
                                    text: "Time",
                                    font: {
                                        weight: 'bold', // Make the "Time" title bold
                                        size: 14,       // Adjust the size if needed
                                    },
                                },
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: "Kecepatan",
                                    font: {
                                        weight: 'bold', // Make the "Time" title bold
                                        size: 14,       // Adjust the size if needed
                                    },
                                },
                            },
                        },
                    },
                });
            } else {
                // Update chart data and re-render
                chartRef.current.chart.data.labels = time;
                chartRef.current.chart.data.datasets[0].data = kecepatan;
                chartRef.current.chart.update();
            }
        }
    }, [kecepatan, time]); // Update chart whenever kecepatan or time changes

    return (
        <div className="w-[55vw] h-[55vw] ml-[1vw]">
            <canvas ref={chartRef} />
        </div>
    );
};

export default LinePlot;
