import Description from "./components/Description";
import SensorBoxArah from './components/SensorBoxArah';
import SensorBoxKecepatan from './components/SensorBoxKecepatan';
import LastUpdate from "./components/LastUpdate";
import LinePlot from "./components/LinePlot";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col items-start ">
      <div className="w-full h-[7.24vw] bg-[#1F127E] flex flex-row items-center justify-center font-bold text-white text-[3.542vw]">Ely-CAN DASHBOARD</div>
      <div className="flex mt-[1vw] relative">
        <div className="flex flex-col justify-start items-start ml-[2vw] relative">
          <Description/>
          <div className="w-full flex justify-between items-center mt-[1vw]">
            <SensorBoxKecepatan>Kecepatan Angin</SensorBoxKecepatan>
            <SensorBoxArah>Arah Angin</SensorBoxArah>
          </div>
        </div>
          <LinePlot/>
      </div>
      <div className="absolute right-[1vw] top-[0.5vw]">
        <LastUpdate/>
      </div>
    </main>
  );
}
