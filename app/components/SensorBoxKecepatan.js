"use client";

import React, {useEffect, useState} from 'react';
import mqtt from 'mqtt';
import axios from 'axios';

const SensorBoxKecepatan = ({children}) => {
  const [kecepatan, setKecepatan] = useState(null);

  const postData = async (theData) => {
    try {
      await axios.post('http://localhost:5050/post_sensor', theData);
    } catch (err) {
      console.log(err.message);
    }
  }
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
      client.subscribe('ely-can-sub/1', (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Subscribed to topic: ely-can-sub/1')
        }
      });
    };

    const onMessage = async(topic, message) => {
      console.log(`Received message from ${topic}: ${message.toString()}`);
      try {
        const data = JSON.parse(message);
        const newKecepatan = data.Kecepatan !== null ? data.Kecepatan.toFixed(2) : 'null';
        
        const dataSend = {
          kecepatanCur: parseFloat(data.Kecepatan),
          arahCur: parseInt(data.Arah),
        }

        postData(dataSend);
        setKecepatan(newKecepatan);
      } catch (err) {
        console.error('Failed to parse JSON:', err);
      }
    };
    client.on('connect', onConnect);
    client.on('message', onMessage);
  }, []);

  return (
    <div className="w-[15.625vw] h-[13.75vw] rounded-[0.781vw] bg-white drop-shadow-lg text-center">
      <h1 className="font-bold text-[1.563vw] mt-[0.3vw]">{children}</h1>
      <h1 className="mt-[2vw]">{kecepatan !== null ? `${kecepatan} m/s` : 'Loading...'}</h1>
    </div>
  )
}

export default SensorBoxKecepatan;