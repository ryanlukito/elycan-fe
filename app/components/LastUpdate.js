"use client";

import React, {useEffect, useState} from 'react'
import axios from 'axios';

const LastUpdate = () => {
    const [time, setTime] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTime = async () => {
            try {
                const response = await axios.get("http://localhost:5050/get_time");
                setTime(response.data.time);
            } catch (err) {
                setError(err.message);
            }
        };

        getTime();
        const interval = setInterval(getTime, 2000);  // Poll every 5 seconds

        return () => clearInterval(interval);  // Cleanup the interval on component unmount
    }, []);

  return (
    <div>
        <h1>Last Updated: {time !== null ? `${time}` : '--'}</h1>
    </div>
  )
}

export default LastUpdate