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

  function CircleColor(kecepatan) {
    const ans = [];
    if ((kecepatan > 0) && (kecepatan <= 5.2)) {
      ans.push("#00B050");
      ans.push("Udara Tenang")
    } else if ((kecepatan > 5.2) && (kecepatan <= 8)) {
      ans.push("#00B0F0");
      ans.push("Angin Lemah")
    } else if ((kecepatan > 8) && (kecepatan <= 10.8)) {
      ans.push("#0070C0");
      ans.push("Angin Sedang")
    } else if ((kecepatan > 10.8) && (kecepatan <= 13.8)) {
      ans.push("#FFFF00");
      ans.push("Angin Segar")
    } else if ((kecepatan > 13.8) && (kecepatan <= 17.2)) {
      ans.push("#FFC000");
      ans.push("Angin Kuat")
    } else if ((kecepatan > 17.2) && (kecepatan <= 20.8)) {
      ans.push("#FF0000");
      ans.push("Angin Ribut")
    } else if ((kecepatan > 20.8) && (kecepatan <= 24.1)) {
      ans.push("#FF0000");
      ans.push("Angin Ribut Sedang")
    } else if ((kecepatan > 24.1) && (kecepatan <= 28.3)) {
      ans.push("#FF0000");
      ans.push("Angin Ribut Kuat")
    } else if ((kecepatan > 28.4) && (kecepatan <= 32.6)) {
      ans.push("#FF0000");
      ans.push("Badai")
    } else if (kecepatan > 32.6) {
      ans.push("#FF0000");
      ans.push("Badai sedang")
    } else {
      ans.push("#FFFFFF");
      ans.push("")
    }
    return ans;
  }; 

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
      <h1 className="font-bold text-[1.563vw] mt-[0.9vw]">{children}</h1>
      <div
        className="w-[8vw] h-[8vw] mx-auto my-[0.3vw] flex items-center justify-center rounded-full border-[0.5vw]"
        style={{ borderColor: CircleColor(kecepatan)[0]}}
      >
        <span className="text-[1.3vw]" style={{ color: "#000" }}>
        {kecepatan !== null ? `${kecepatan} m/s` : 'Device Disconnected'}
        </span>
      </div>
      <h1 className="text-[1vw] font-bold">{CircleColor(kecepatan)[1]}</h1>
    </div>
  )
}

export default SensorBoxKecepatan;