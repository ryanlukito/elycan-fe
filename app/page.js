import Description from "./components/Description";
import SensorBoxArah from './components/SensorBoxArah';
import SensorBoxKecepatan from './components/SensorBoxKecepatan';
import LastUpdate from "./components/LastUpdate";
import LinePlot from "./components/LinePlot";
import Footer from "./components/Footer";
import TXRX from "./components/TXRX";
import ButtonToDB from "./components/ButtonToDB";
import Image from "next/image";

export default function Home() {
  return (
    <body className="overflow-hidden">
      <main className="w-full h-full flex flex-col items-start overflow-hidden relative">
        <div className="w-full h-[7.24vw] bg-[#1F127E] flex flex-row items-center justify-center font-bold text-white text-[3.542vw]">Ely-CAN DASHBOARD</div>
        <div className="absolute right-[1vw] top-[0.5vw]">
          <LastUpdate/>
          <ButtonToDB/>
        </div>
        <div className="flex mt-[1vw] relative">
          <div className="flex flex-col justify-start items-start ml-[2vw]">
            <Description/>
            <div className="w-full flex justify-between items-center mt-[0.5vw]">
              <SensorBoxKecepatan>Kecepatan Angin</SensorBoxKecepatan>
              <SensorBoxArah>Arah Angin</SensorBoxArah>
              <TXRX/>
            </div>
          </div>
            <LinePlot/>
        </div>
        <Footer/>
      </main>
    </body>
  );
}
